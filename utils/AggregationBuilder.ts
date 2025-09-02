type AggregationStage = Record<string, unknown>

interface QueryString {
  page?: string
  sort?: string
  limit?: string
  fields?: string
  search?: string
  searchField?: string
  groupByFields?: string // e.g. "role,status"
  [key: string]: string | string[] | undefined
}

class AggregationBuilder {
  pipeline: AggregationStage[] = []
  queryString: QueryString

  constructor(queryString: QueryString) {
    this.queryString = queryString
  }

  filter(): this {
    const queryObj = { ...this.queryString }
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'search',
      'searchField',
      'groupByFields'
    ]
    excludedFields.forEach((el) => delete queryObj[el])

    if (Object.keys(queryObj).length) {
      this.pipeline.push({ $match: queryObj })
    }

    return this
  }

  search(): this {
    const { search, searchField } = this.queryString
    if (search && searchField) {
      const searchFields = searchField.split(',').map((field) => field.trim())
      const orQuery = searchFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' }
      }))
      this.pipeline.push({ $match: { $or: orQuery } })
    }
    return this
  }

  sort(): this {
    if (this.queryString.sort) {
      // Convert sort string to object like { field: 1/-1 }
      const sortObj: Record<string, 1 | -1> = {}
      this.queryString.sort.split(',').forEach((field) => {
        if (field.startsWith('-')) sortObj[field.substring(1)] = -1
        else sortObj[field] = 1
      })
      this.pipeline.push({ $sort: sortObj })
    }
    return this
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.pipeline.push({
        $project: fields
          .split(' ')
          .reduce((proj, f) => ({ ...proj, [f]: 1 }), {})
      })
    }
    return this
  }

  paginate(): this {
    const page = parseInt(this.queryString.page ?? '1', 10)
    const limit = parseInt(this.queryString.limit ?? '30', 10)
    const skip = (page - 1) * limit

    this.pipeline.push({ $skip: skip })
    this.pipeline.push({ $limit: limit })
    return this
  }

  // Dynamic groupBy method: pass array of fields & aggregation specs
  groupBy(fields: string[], aggregations: Record<string, unknown>): this {
    if (!fields.length) return this

    const _id =
      fields.length === 1
        ? `$${fields[0]}`
        : fields.reduce(
            (acc, f) => {
              acc[f] = `$${f}`
              return acc
            },
            {} as Record<string, string>
          )

    this.pipeline.push({
      $group: {
        _id,
        ...aggregations
      }
    })
    return this
  }

  group(): this {
    if (this.queryString.groupBy) {
      const groupField = this.queryString.groupBy
      this.pipeline.push({
        $group: {
          _id: `$${groupField}`,
          count: { $sum: 1 }
        }
      })
    }
    return this
  }

  // Static example groupBy on "role" with count and avgNameLength
  groupByRole(): this {
    this.pipeline.push({
      $group: {
        _id: '$role',
        count: { $sum: 1 },
        avgNameLength: { $avg: { $strLenCP: '$name' } }
      }
    })
    return this
  }

  addFields(): this {
    if (this.queryString.addFields) {
      try {
        const fields = JSON.parse(this.queryString.addFields as string)
        this.pipeline.push({ $addFields: fields })
      } catch (e) {
        console.error('Invalid JSON in addFields:', e)
        throw new Error('Invalid addFields parameter')
      }
    }
    return this
  }

  build(): AggregationStage[] {
    return this.pipeline
  }
}

export { AggregationBuilder }

// Usage example:
// const agg1 = new AggregationBuilder({
//   groupByFields: 'role,status'
//   // other query params if needed
// })
//   .filter()
//   .groupBy(['role', 'status'], { count: { $sum: 1 } })
//   .sort()
//   .paginate()
//   .build()

/*
const builder = new AggregationBuilder(req.query)
  .match()
  .search()
  .addFields()
  .group()
  .paginate()

const pipeline = builder.build()
const results = await Model.aggregate(pipeline)
?search=John&searchField=name,email&sort=-createdAt&groupBy=role&fields=name,email
 */
