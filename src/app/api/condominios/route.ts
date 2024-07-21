export async function GET() {
  const data = await fetch(
    "https://administradora-digital-run1-mfrrjeldtq-uc.a.run.app/api/Condominios"
  );

  const dataJson = await data.json();

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

export async function PUT(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(
      `https://administradora-digital-run1-mfrrjeldtq-uc.a.run.app/api/Condominios/${body.id}`,
      {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return Response.json({ message: "Condomínio editado com sucesso!" });
    }

    return Response.json(
      { message: "Erro ao editar condomínio." },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      { message: "Erro ao editar condomínio." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  try {
    const response = await fetch(
      `https://administradora-digital-run1-mfrrjeldtq-uc.a.run.app/api/Condominios/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 204) {
      return Response.json({ message: "Condomínio deletado com sucesso!" });
    }

    return Response.json(
      { message: "Erro ao deletar condomínio." },
      { status: 400 }
    );
  } catch (error) {
    return Response.json(
      { message: "Erro ao deletar condomínio." },
      { status: 500 }
    );
  }
}
