function getAPIUrl() {
  if (!process.env.API_URL) {
    throw new Error("API_URL is not defined.");
  }

  return process.env.API_URL;
}

const API_URL = getAPIUrl();

export async function GET() {
  const data = await fetch(API_URL);

  const dataJson = await data.json();

  return Response.json(dataJson);
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseJson = await response.json();

  return Response.json(responseJson);
}

export async function PUT(request: Request) {
  const body = await request.json();

  try {
    const response = await fetch(`${API_URL}/${body.id}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

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
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

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
