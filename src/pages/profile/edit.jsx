import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import styles from './edit.module.css';
import UploadImage from "@/components/UploadImage";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Swal from 'sweetalert2';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
import { getToken, gatTokenByHeaderRequest } from '@/utils/auth/token';

function ProfilePage() {
  useEffect(() => {
    document.title = 'Batoifolio - Editar Perfil';
  }, []);

  const { user, login: setAuthUser, logout } = useContext(AuthContext);
  const token = getToken();
  const router = useRouter();
  const [fotoPerfil, setFotoPerfil] = useState(null);


  const [form, setForm] = useState({
    fotoPerfil: user.fotoPerfil || '',
    nombre: user.nombre || '',
    apellidos: user.apellidos || '',
    email: user.email || '',
    telefono: user.telefono || '',
    pueblo: user.pueblo || '',
    ramaId: user.ramaId || 0,
    gradoId: user.gradoId || 0,
    descripcion: user.descripcion || '',
  });

  const [familias, setFamilias] = useState([]);
  const [grados, setGrados] = useState([]);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    const fetchFamilias = async () => {
      try {
        const response = await fetch(apiUrl + 'ramas');
        if (!response.ok) {
          throw new Error('Error al cargar las familias');
        }
        const dataFamilias = await response.json();
        setFamilias(dataFamilias.data);
      } catch (error) {
        // setServerError(error.message);
        setFamilias([{ id: 0, nombre: 'No se han encontrado familias' }]);
      }
    };
    const fetchGrados = async () => {
      try {
        const response = await fetch(apiUrl + 'grados');
        if (!response.ok) {
          throw new Error('Error al cargar los grados');
        }
        const dataGrados = await response.json();
        setGrados(dataGrados.data);
      } catch (error) {
        // setServerError(error.message);
        setGrados([{ id: 0, nombre: 'No se han encontrado grados' }]);
      }
    };

    fetchFamilias();
    fetchGrados();

    if (serverError) {
      Swal.fire({
        icon: 'error',
        title: 'Error al Guardar',
        text: serverError,
        confirmButtonText: 'Aceptar',
      }).then(() => {
        setServerError('');
      });

    }

  }, [serverError]);



  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function validate() {
    const errs = {};
    if (!form.nombre.trim()) errs.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) errs.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = 'Email inválido';
    return errs;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setServerError('');
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      // parsear a numero ramaId y gradoId
      form.ramaId = parseInt(form.ramaId);
      form.gradoId = parseInt(form.gradoId);

      const res = await fetch(apiUrl + 'users/' + user.id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        // if (data.message) {
        //   setErrors(data.message);
        // } else {
        setServerError(data.message);
        // }
      } else {
        const rescquest = await res.json();
        const newToken = gatTokenByHeaderRequest(res);
        setAuthUser(newToken, rescquest.data);
        router.push('/profile');
      }
    } catch (error) {
      setServerError('Error de conexión con el servidor');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.layout}>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={form.fotoPerfil || '/default-avatar.png'} alt="Avatar" />

          <input
            type="text"
            name="fotoPerfil"
            placeholder="URL de la foto de perfil"
            value={form.fotoPerfil}
            onChange={handleChange}
            className={styles.input}
          />

          <UploadImage
            onUpload={(url) => setForm(prev => ({ ...prev, fotoPerfil: url }))}
          />
        </div>
        <div className={styles.userInfo}>
          <label>
            <strong>Usuario:</strong>
            <input
              type="text"
              name="username"
              value={user.username}
              className={styles.input}
              disabled
            />
          </label>
          <label>
            <strong>Nombre:</strong>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label>
            <strong>Apellidos:</strong>
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
        </div>
      </div>

      <div className={styles.mainInfo}>
        <div className={styles.cardSection}>
          <h3><strong>Datos Personales</strong></h3>
          <label>
            <strong>Teléfono:</strong>
            <input
              type="text"
              name="telefono"
              value={form.telefono}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <label>
            <strong>Ciudad:</strong>
            <input
              type="text"
              name="pueblo"
              value={form.pueblo}
              onChange={handleChange}
              className={styles.input}
            />
          </label>
          <p><strong>Miembro desde:</strong> {new Date(user.creadoEn).toLocaleDateString()}</p>
        </div>
        <div className={styles.cardSection}>
          <h3><strong>Información Académica</strong></h3>
          <label>
            <strong>Familia:</strong>
            <select
              name="ramaId"
              value={form.ramaId}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Selecciona una familia</option>
              {familias.map(familia => (
                <option key={familia.id} value={familia.id}>
                  {familia.nombre}
                </option>
              ))}
            </select>
          </label>
          <label>
            <strong>FP Cursando:</strong>
            <select
              name="gradoId"
              value={form.gradoId}
              onChange={handleChange}
              className={styles.input}
            >
              <option value="">Selecciona una familia</option>
              {grados.map(grado => (
                <option key={grado.id} value={grado.id}>
                  {grado.nombre}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className={styles.description}>
        <h3><strong>Descripción</strong></h3>
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          className={styles.textarea}
          rows="4"
          placeholder="Agrega tu biografía..."
        />
      </div>



      <div className={styles.buttons}>
        <Link href="/profile" className={styles.cancelButton}>Cancelar</Link>
        <button type="submit" disabled={loading} className={styles.saveButton}>
          {loading ? 'Guardando...' : 'Guardar'}
        </button>
      </div>
    </form>
  );
}

ProfilePage.auth = true;

export default ProfilePage;
