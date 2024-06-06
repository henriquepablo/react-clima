import React, { useEffect, useState } from 'react';
import '../../style/Card.css'
import ImagemSol from '../../img/sol.png'

function Card() {
    const [nameCity, setNameCity] = useState('São Paulo');
    const [dias, setDias] = useState([
    {
        dia: 'segunda',
        temperatura: 0
    },
    {
        dia: 'terça',
        temperatura: 0
    },
    {
        dia: 'quarta',
        temperatura: 0
    },
    {
        dia: 'quinta',
        temperatura: 0
    },
    {
        dia: 'sexta',
        temperatura: 0
    },{
        dia: 'sábado',
        temperatura: 0
    },
    {
        dia: 'Domingo',
        temperatura: 0
    }]);

    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${nameCity}&lang=pt_br&appid=b34ddb2bac572c7d57c315df91073134&units=metric`

    useEffect(() => {
        fetch(url)
        .then(resposta =>{
          console.log(resposta)
          return resposta.json()
        })
          .then(dados =>{

           let aux = 0;
            for (let i = 3; i < 35; i+=8) {
                
                dias[aux].temperatura = dados.list[i].main.temp;
                aux++;
            }
            
          })
          .catch(erro => {
            console.log(erro)
        });
    },[nameCity]);
    
    return(
        <div className="container">
            
            <input placeholder='Digite o nome da cidade' className='input'
            onChange={(value) => value =='' ? setNameCity('São Paulo') : setNameCity(value.target.value)}
            />

            <h2 className='cityName'>
                {nameCity}
            </h2>
            
            {
                dias.map((dia)=>{
                    return(
                        <div>
                            <div className='tempAndImg'>
                                <h1 className='temperatura'>
                                    {dia.dia}
                                </h1>
                                <img src={ImagemSol} alt='Sol' className='imgSol'/>
                            </div>
                            
                            <div className='containerText'>
                                <p className='textDescription'>Temperatura: {dia.temperatura}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Card;