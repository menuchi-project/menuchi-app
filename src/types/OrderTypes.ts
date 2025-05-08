import { Int, UUID } from "./TypeAliases";

/**
 *  @minItems 1 at least 1 item is required
 */
export interface OrderItemCompactIn {
  itemId: UUID;
  /**
   * @minimum 1 minimum age is 1
   */
  amount: Int;
}