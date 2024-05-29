export function isPendingAction(action) {
  return action.type.endsWith("/pending");
}
export function isFulfilledAction(action) {
  return action.type.endsWith("/fulfilled");
}
export function isRejectedAction(action) {
  return action.type.endsWith("/rejected");
}
