
async function get(req: string) {
  const res = await fetch(req, {next: {revalidate: 60}});

  if (!res.ok) {
    throw new Error("Failed to reach server");
  }

  return res.json();
}

export { get };
