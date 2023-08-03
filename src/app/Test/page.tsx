'use client';
import { supabase } from '@/utils/supabase';



// interface HomePageProps {
//   customers: any;
// }

// export default function Test({ customers }: HomePageProps) {
//     return (
//         <div>
//             { Array.isArray(customers) && customers.map((customer: any) => (
//             <p key={customer.id}>{customer.title}</p>
//             ))}
//         </div>
//     )
// }

//  export const getStaticProps = async () => { 
//     const { data: customers } = await supabase.from('customers').select('*')

//     return {
//         props: {
//             customers
//         }
//     }
//  }
//  import { useEffect, useState } from 'react';

// // Replace with your actual type
// type Customer = {
//   // id: number;
//   // name: string;
//   // ...
// };

// function Home() {
//   const [customers, setCustomers] = useState<Customer[]>([]);

//   useEffect(() => {
//     fetch('/api/lessons') // Replace with your API endpoint
//       .then(response => response.json())
//       .then(data => setCustomers(data))
//       .catch(error => console.error('Error:', error));
//   }, []);

//   // ...rest of your component
// }

// export default Home;

import { useEffect, useState } from 'react';

type Customer = {
  id: number;
  customer_name: string;
  // ... rest of the properties
};
type HomeProps = {
  customers: Customer[];
};
//

function Home() {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('customers').select('*');
      if (error) console.error('Error:', error);
      else setCustomers(data || []);
    };

    fetchData();
  }, []);

  return (
    <div>
      {customers.map((customer) => (
        <p key={customer.id}>{customer.customer_name}</p>
      ))}
    </div>
  );
}

export default Home;
