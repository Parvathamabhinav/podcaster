import React from 'react';
import { Link } from 'react-router-dom';

const Categories = () => {
 const cat =[
    {
        name:"Comedy",
        color:"bg-purple-200",
        to:"/categories/Comedy",
        img:"https://img.freepik.com/free-photo/3d-rendering-emotions_23-2149081924.jpg?uid=R188317061&ga=GA1.1.554575823.1740064416&semt=ais_hybrid",
    },
    {
        name:"Drama",
        color:"bg-pink-200",
        to:"/categories/Drama",
        img:"https://img.freepik.com/premium-photo/mask-with-mouth-that-saysnoon-it_1055732-13435.jpg?uid=R188317061&ga=GA1.1.554575823.1740064416&semt=ais_hybrid",
    },
    {
        name:"Sci-Fi",
        color:"bg-green-200",
        to:"/categories/Sci-Fi",
        img:"https://img.freepik.com/premium-photo/technology-trends-internet-digital-revolution-transforming-industries-people-lives_563241-81489.jpg?uid=R188317061&ga=GA1.1.554575823.1740064416&semt=ais_hybrid",
    },
    {
        name:"Thriller",
        color:"bg-red-200",
        to:"/categories/Thriller",
        img:"https://img.freepik.com/premium-photo/luffy-face-ripped-cut-away-design_1230721-9252.jpg?uid=R188317061&ga=GA1.1.554575823.1740064416&semt=ais_hybrid",
    },
    {
        name:"Action",
        color:"bg-yellow-200",
        to:"/categories/Action",
        img:"https://img.freepik.com/free-photo/superhero-doll_1048-2391.jpg?uid=R188317061&ga=GA1.1.554575823.1740064416&semt=ais_hybrid",
    },
 ]
 return (
    <div className='h-screen lg:h-[78vh]'>
        <div className="px-4 lg:px-12 py-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cat.map((items,i)=>
                <Link to={items.to} key={i} className={`rounded px-8 py-4 text-xl font-semibold ${items.color} hover:scale-105 shadow-xl transition-all duration-300 relative h-[22vh] overflow-hidden -z-10`}>
                    <div>{items.name}</div>
                    <div className='w-[100%] flex items-center justify-end absolute -bottom-2 -right-2'>
                        <img src={items.img} alt="category" className='rounded rotate-12 h-[15vh] md:h-[17vh] lg:h-[18vh]' />
                    </div>
                </Link>)}
        </div>
    </div>
 )
}

export default Categories;
