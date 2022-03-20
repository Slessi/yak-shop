const apiUrl = "http://localhost:3000/yak-shop";

async function api(path: string, options?: RequestInit) {
  const data = await fetch(`${apiUrl}/${path}`, options);

  return data.json();
}

export function getHerd(T: number) {
  return api(`herd/${T}`);
}

export function getStock(T: number) {
  return api(`stock/${T}`);
}

export interface Order {
  customer: string;
  order: {
    milk?: number;
    skins?: number;
  };
}

export function placeOrder(T: number, order: Order) {
  return api(`order/${T}`, {
    method: "POST",
    body: JSON.stringify(order),
  });
}
