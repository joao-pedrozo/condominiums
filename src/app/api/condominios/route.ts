export async function GET() {
  const data = await fetch(
    "https://administradora-digital-run1-mfrrjeldtq-uc.a.run.app/api/Condominios"
  );

  const dataJson = await data.json();

  console.log(dataJson);

  return Response.json(dataJson);
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(
    "https://administradora-digital-run1-mfrrjeldtq-uc.a.run.app/api/Condominios",
    {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseJson = await response.json();

  return Response.json(responseJson);
}
