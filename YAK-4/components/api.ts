const apiUrl = "http://localhost:3000/yak-shop";

async function api<T>(path: string, options: RequestInit = {}) {
  const data = await fetch(`${apiUrl}/${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  const json = await data.json();

  if (data.status >= 400) {
    throw new Error(json.message?.join("\n"));
  }

  return json as T;
}

export interface HerdResponse {
  herd: {
    name: string;
    age: number;
    "age-last-shaved": number;
  }[];
}

export function getHerd(T: number) {
  return api<HerdResponse>(`herd/${T}`);
}

export interface StockResponse {
  milk: number;
  skins: number;
}

export function getStock(T: number) {
  return api<StockResponse>(`stock/${T}`);
}

export interface Order {
  customer: string;
  order: {
    milk?: number;
    skins?: number;
  };
}

export interface OrderResponse {
  milk?: number;
  skins?: number;
}

export function placeOrder(T: number, order: Order) {
  return api<OrderResponse>(`order/${T}`, {
    method: "POST",
    body: JSON.stringify(order),
  });
}
