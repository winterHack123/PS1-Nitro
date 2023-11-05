import { createClient } from '@/utils/supabase-server';
import { NextResponse } from 'next/server';
// import fast2sms from 'fast-two-sms';

export async function POST(request: Request) {
  // const supabase = createClient();

  // const {
  //   data: { session },
  // } = await supabase.auth.getSession();

  // if (!session) {
  //   return new Response('Unauthorized', { status: 401 });
  // }

  // const { data: posts, error } = await supabase
  //   .from('posts')
  //   .select('*')
  //   .eq('author', session?.user.id);

  // if (error) {
  //   return new Response(error.message, { status: 500 });
  // }

  const body = await request.json();

  console.log(body);

  if (!body?.message || !body?.phone) {
    return new Response('All fields required!', { status: 401 });
  }

  try {
    let options = {
      authorization:
        '5sGhAeD3i4CTWVjzEovQS0c86yxUgkpwfYdNK2IORtBJFl1H9bTjbNek20O481FKh6GrRzQl3oYdJuVI',
      message: body.message,
      numbers: [body.phone],
    };

    // fast2sms.sendMessage(options);

    return NextResponse.json('Ok');
  } catch (error) {
    return new Response('Something went wrong!', { status: 500 });
  }
}
