const products = [
  {
    id: 1,
    name: "Picanha Premium na Chapa",
    category: "porcoes",
    price: 159.90,
    description: "500g de picanha fatiada na chapa quente, acompanhada de mandioca frita ou batata, farofa caseira e vinagrete.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=500",
    hasDoneness: true,
    customizations: {
      extras: [
        { name: "Queijo Coalho Grelhado", price: 12.00 },
        { name: "Porção de Farofa Extra", price: 6.00 },
        { name: "Mandioca Extra", price: 10.00 }
      ],
      removables: ["Vinagrete", "Cheiro-Verde", "Cebola na Chapa"]
    }
  },
  {
    id: 2,
    name: "PF Executivo de Picanha",
    category: "pratos",
    price: 79.90,
    description: "Suculento bife de picanha grelhado, servido com arroz branco, batata frita ou mandioca e salada da casa.",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=500",
    hasDoneness: true,
    customizations: {
      extras: [
        { name: "Ovo Frito", price: 3.50 },
        { name: "Bacon Crocante", price: 5.00 },
        { name: "Feijão Tropeiro", price: 6.00 }
      ],
      removables: ["Feijão", "Salada", "Farofa", "Cebola"]
    }
  },
  {
    id: 3,
    name: "PF Comercial de Bife Acebolado",
    category: "pratos",
    price: 32.90,
    description: "Bife de alcatra acebolado, arroz, feijão, batata palito e salada de alface com tomate.",
    image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500",
    hasDoneness: false,
    customizations: {
      extras: [
        { name: "Ovo Frito", price: 3.50 },
        { name: "Farofa Caseira", price: 4.00 }
      ],
      removables: ["Cebola", "Salada", "Feijão"]
    }
  },
  {
    id: 4,
    name: "Porção de Frango a Passarinho",
    category: "porcoes",
    price: 45.00,
    description: "600g de frango a passarinho crocante e sequinho, polvilhado com alho frito e cheiro-verde.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?w=500",
    hasDoneness: false,
    customizations: {
      extras: [
        { name: "Alho Frito Extra", price: 3.00 },
        { name: "Molho Verde da Casa", price: 4.00 }
      ],
      removables: ["Alho Frito", "Cheiro-Verde"]
    }
  },
  {
    id: 5,
    name: "Cerveja Heineken 600ml",
    category: "bebidas",
    price: 16.00,
    description: "Garrafa de 600ml trincando de gelada.",
    image: "https://images.unsplash.com/photo-1608270586620-248524c67de9?w=500",
    hasDoneness: false,
    customizations: {
      extras: [],
      removables: ["Copo com Gelo"]
    }
  },
  {
    id: 6,
    name: "Suco Natural de Laranja 500ml",
    category: "bebidas",
    price: 9.50,
    description: "Suco 100% natural da fruta, feito na hora.",
    image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500",
    hasDoneness: false,
    customizations: {
      extras: [
        { name: "Açúcar Extra", price: 0.00 }
      ],
      removables: ["Gelo", "Açúcar"]
    }
  }
];