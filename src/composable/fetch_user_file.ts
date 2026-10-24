async function fetchUserFile(name:string) {
  const response = await fetch(`/api/files/${encodeURIComponent(name)}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  console.log(data);
  return data;
}   

export { fetchUserFile }
