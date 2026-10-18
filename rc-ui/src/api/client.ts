export async function getJson<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function postJson<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to post to ${url}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function postFile<T>(url: string, file: File): Promise<T> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(url, {
    method: "POST",
    body: formData,
  });
  if (!response.ok) {
    throw new Error(`Failed to post file to ${url}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

export async function patchJson<T>(url: string, data: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Failed to patch to ${url}: ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// Rails' destroy responds 204 with no body, so there is nothing to parse
export async function deleteRequest(url: string): Promise<void> {
  const response = await fetch(url, { method: "DELETE" });
  if (!response.ok) {
    throw new Error(`Failed to delete ${url}: ${response.statusText}`);
  }
}
