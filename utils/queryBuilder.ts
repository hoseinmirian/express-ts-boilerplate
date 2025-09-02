import { type Query } from 'mongoose'
import { type ParsedQs } from 'qs'

export interface QueryString extends ParsedQs {
  page?: string
  sort?: string
  limit?: string
  fields?: string
  search?: string
  searchField?: string
  autocomplete?: string
  autocompleteField?: string
  [key: string]: string | string[] | undefined
}

class QueryBuilder<T> {
  query: Query<T[], T>
  queryString: QueryString

  constructor(query: Query<T[], T>, queryString: QueryString) {
    this.query = query
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
      'autocomplete',
      'autocompleteField'
    ]
    excludedFields.forEach((el) => delete queryObj[el])

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt|in|ne|nin|regex)\b/g,
      (match) => `$${match}`
    )
    this.query = this.query.find(JSON.parse(queryStr))

    return this
  }

  search(): this {
    const { search, searchField } = this.queryString
    if (search && searchField) {
      const searchFields = searchField.split(',').map((field) => field.trim())
      const searchQuery = searchFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' }
      }))
      this.query = this.query.or(searchQuery)
    }
    return this
  }

  autocomplete(): this {
    const { autocomplete, autocompleteField } = this.queryString
    if (autocomplete && autocompleteField) {
      const regex = new RegExp(`^${autocomplete}`, 'i')
      this.query = this.query.find({ [autocompleteField]: regex })
    }
    return this
    // be careful with autocomplete queries, as they override the pagination
    //   usage example: fetch('/api/users?autocomplete=Al&autocompleteField=name')
  }

  sort(): this {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ')
      this.query = this.query.sort(sortBy)
    } else {
      this.query = this.query.sort('-createdAt')
    }
    return this
  }

  limitFields(): this {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ')
      this.query = this.query.select(fields)
    } else {
      this.query = this.query.select('-__v')
    }
    return this
  }

  paginate(): this {
    const page = parseInt(this.queryString.page ?? '1', 10)
    const limit = parseInt(this.queryString.limit ?? '30', 10)
    const skip = (page - 1) * limit
    this.query = this.query.skip(skip).limit(limit)
    return this
  }
}

export { QueryBuilder }
