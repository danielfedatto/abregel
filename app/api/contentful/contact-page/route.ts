import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Verificar se as variáveis de ambiente estão disponíveis
    if (!process.env.CONTENTFUL_SPACE_ID || !process.env.CONTENTFUL_ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Configuração do Contentful não encontrada' },
        { status: 500 }
      );
    }

    const { createClient } = await import('contentful');
    const client = createClient({
      space: process.env.CONTENTFUL_SPACE_ID,
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      environment: process.env.CONTENTFUL_ENVIRONMENT || 'master',
    });

    const response = await client.getEntries({
      content_type: '6RLu9FMBw2SudnmlgBl5qf',
      order: ['fields.order'],
      limit: 1,
    });

    if (response.items.length === 0) {
      return NextResponse.json(
        { error: 'Nenhuma página de contato encontrada' },
        { status: 404 }
      );
    }

    const contactPage = response.items[0];
    
    return NextResponse.json(contactPage, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });

  } catch (error) {
    console.error('Erro ao buscar página de contato:', error);
    
    return NextResponse.json(
      { error: 'Erro interno do servidor' },
      { status: 500 }
    );
  }
}
