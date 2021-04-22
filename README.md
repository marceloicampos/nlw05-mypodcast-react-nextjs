This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## TypeScript with Next.js

Check out this [Next.js Basic Features: TypeScript](https://nextjs.org/docs/basic-features/typescript) for more details.

npm install --save-dev typescript @types/react @types/node

convert all files js to tsx files and run >>> npm run dev

tsx = typescript + jsx (xml no javascript)

## Sass with Next.js

Check out this [Sass: Install Sass](https://sass-lang.com/install) for more details.

npm install sass

## date-fns - modern JavaScript date utility library

Check out this [install date-fns](https://date-fns.org/docs/Getting-Started) for more details.

npm install date-fns --save

## Json Server

Check out this [install Json Server](https://github.com/typicode/json-server) for more details.

npm install json-server --save-dev

<!--
PARA ACESSAR AS PROPRIEDADES DE COMPONENTES

export default function Button(props) {
	return (
	<button>{props.title}</button>
	)
}

import Button from ".Button";

function App() {
    return (
        <>
        <Button title=" Button 1" />
        </>
    )
}

--------------------------------------------

PARA ACESSAR O CHILDREN DE COMPONENTES

export default function Button(props) {
	return (
	<button>{props.children}</button>
	)
}

import Button from ".Button";

function App() {
    return (
        <>
        <Button>Button 1</Button>
        </>
    )
}

--------------------------------------------

CONCEITO DE ESTADO NO REACT: É UMA FORMA DE MANIPULAR INFORMAÇÕES DE DENTRO DE UM COMPONENTE

import { useState } from 'react';

export default function Button(props) {

	const [counter, setCounter] = useState(1);
	
	function increment() {
	setCounter(counter + 1);
}	

	return (
	<>
	span>{counter}</span>
	<button onClick={increment}>{props.children}</button>
	<br />
	</>
	)
}

import Button from ".Button";

function App() {
    return (
        <>
        <Button>Button 1</Button>
        </>
    )
}
-->
