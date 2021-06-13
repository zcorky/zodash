export function sample(data: any[]) {
  const randomIndex = parseInt('' + Math.random() * data.length);
  return data[randomIndex];
}

export default sample;
