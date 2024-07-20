export async function GET() {
  const data = await fetch(
    "https://administradora-digital-run1-mfrrjeldtq-uc.a.run.app/api/Condominios"
  );

  const dataJson = await data.json();

  console.log(dataJson);

  return Response.json(dataJson);
}
