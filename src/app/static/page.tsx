// import Link from 'next/link'
// import {supabase} from '../../utils/supabase'

// export const revalidate = 0

// export default async function Posts() {
//   const { data: customers } = await supabase.from('customers').select('id, name')
//   console.log(customers)

//   if (!customers) {
//     return <p>No posts found.</p>
//   }

//   return customers.map((post) => (
//     <p key={post.id}>
//        <Link href={`/static/${post.id}`}>{post.name}</Link>
//     </p>
//   ))
// }
import Link from 'next/link';
import { supabase } from '../../utils/supabase';

export const revalidate = 0;

export default async function Posts() {
  try {
    let { data: customers } = await supabase.from('customers').select('id, name');

    if (!customers || customers.length === 0) {
      return <p>No posts found.</p>;
    }

    return customers.map((post) => (
      <p key={post.id}>
        <Link href={`/static/${post.id}`}>{post.name}</Link>
      </p>
    ));
  } catch (error) {
    // Log the error to the console for debugging purposes
    console.error('Error fetching data:', error);
    // You can also display an error message to the user if something goes wrong
    return <p>Error fetching data. Please try again later.</p>;
  }
}



// import Link from 'next/link'
// import {supabase} from '../../utils/supabase'

// export const revalidate = 0

// export default async function Posts() {
//   const { data: posts } = await supabase.from('posts').select('id, title')

//   if (!posts) {
//     return <p>No posts found.</p>
//   }

//   return posts.map((post) => (
//     <p key={post.id}>
//       <Link href={`/static/${post.id}`}>{post.title}</Link>
//     </p>
//   ))
// }
