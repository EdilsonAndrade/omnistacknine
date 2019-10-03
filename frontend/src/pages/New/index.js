import React, { useState, useMemo } from 'react';
import api from '../../services/api';
import camera from '../../assets/camera.svg';
import './styles.css';


export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);


    async function handleSubmit(e) {
        e.preventDefault();
        const data = new FormData();
        data.append('thumbnail', thumbnail);
        data.append('techs', techs);
        data.append('company', company);
        data.append('price', price);
        const user_id = localStorage.getItem('user');
         await api.post('/spots', data,{
            headers: {user_id}
        });

        history.push('/dashboard');

    }
    return (
        <form onSubmit={handleSubmit}>
            <label id="thumbnail"
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'hasThumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
                <img src={camera} alt="Selecione um arquivo" ></img>

            </label>
            <label htmlFor="company">EMPRESA *</label>
            <input type="text"
                id="company"
                placeholder="Sua incrível empresa"
                value={company}
                onChange={event => setCompany(event.target.value)} />

            <label htmlFor="techs">Techs * <span>(separadas por vírgulas)</span></label>
            <input type="text"
                id="techs"
                placeholder="Tecnologias"
                value={techs}
                onChange={event => setTechs(event.target.value)} />

            <label htmlFor="price">Valor da diária * <span>(em branco para GRATUITO)</span></label>
            <input type="text"
                id="price"
                placeholder="Valor/h branco se gratis!"
                value={price}
                onChange={event => setPrice(event.target.value)} />

            <button className="btn" type="submit">Cadastrar</button>
        </form>
    )
}
