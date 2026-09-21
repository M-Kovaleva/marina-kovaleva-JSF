import type { Product } from '../types/product'
import type { ApiListResponse, ApiSingleResponse } from '../types/api'

const BASE_URL = 'https://v2.api.noroff.dev/online-shop'

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Could not load the product list.')
  }

  const json: ApiListResponse<Product> = await response.json()
  return json.data
}

export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Could not load the product.')
  }

  const json: ApiSingleResponse<Product> = await response.json()
  return json.data
}