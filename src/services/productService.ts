import type { Product } from '../types/product'
import type { ApiListResponse, ApiSingleResponse } from '../types/api'

const BASE_URL = 'https://v2.api.noroff.dev/online-shop'

/**
 * Fetches the full list of products from the Noroff Online Shop API
 *
 * @returns A promise resolving to an array of products
 * @throws If the request fails or the server returns a non-OK response
 */
export async function getProducts(): Promise<Product[]> {
  const response = await fetch(BASE_URL)

  if (!response.ok) {
    throw new Error('Could not load the product list.')
  }

  const json: ApiListResponse<Product> = await response.json()
  return json.data
}

/**
 * Fetches a single product by its id from the Noroff Online Shop API
 *
 * @param id - The product's unique id
 * @returns A promise resolving to the matching product
 * @throws If the request fails, the id doesn't exist, or the server returns a non-OK response
 */
export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/${id}`)

  if (!response.ok) {
    throw new Error('Could not load the product.')
  }

  const json: ApiSingleResponse<Product> = await response.json()
  return json.data
}
