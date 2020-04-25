export function newInstanceToObject(object: any): any {
  return  JSON.parse(JSON.stringify(object));
}
