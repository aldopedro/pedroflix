'use client'
import { useEffect, useState } from "react";
import "./dashboard.css"
import AuthGuard from "@/components/AuthGuard";
import Image from "next/image";

type Profile = {
  id: number;
  name: string;
  avatar_url: string;
  isChild: boolean;
};

export default function ProfilesScreen() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalPlaceholder, setModalPlaceholder] = useState(true);
  const [newProfile, setNewProfile] = useState({
    name: "",
    avatar_url: "/avatars/avatar1.png",
    isChild: false,
  });

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/getProfiles`, {
      headers: {
        method: "GET",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then(res => res.json())
      .then((data: Profile[]) => setProfiles(data))
      .catch(err => console.error("Erro ao buscar perfis:", err));
  }, []);

  const handleAddProfile = async () => {
    setShowModal(true)
  };
  async function handleSubmit() {
    try {
      const result = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/createProfiles`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProfile),
      });

      if (!result.ok) {
        const error = await result.json();
        console.error('Erro na requisição:', error.message || result.statusText);
        return;
      }

      const createdProfile = await result.json();
      setProfiles([...profiles, createdProfile]);
      setShowModal(false);
    } catch (err) {
      console.error("Erro ao criar perfil:", err);
    }
  }
  return (
    

      <div className="profileGrid">
        {profiles.map((profile) => (
          <div key={profile.id} className="profileBox">
            <div>
              <Image className="profileAvatar" src={profile.avatar_url} alt={profile.name} />
            </div>
              <span>{profile.name}</span>
          </div>
        ))}

        <div className="profileBox" >
          <div className="mainProfileBox" onClick={handleAddProfile}>
            <div className="mainIconCircle">
              <div className="iconCircle">
                <span className="iconText">+</span>
              </div>
            </div>
            <p className="profileText">Adicionar perfil</p>
          </div>
        </div>
        {showModal && (
          <div className="modalOverlay">
            <div className="modalContent">
              <button className="closeButton" onClick={() => setShowModal(false)}>×</button>

              <h2 className="modalTitle">Adicionar um perfil</h2>

              <input
                type="text"
                value={newProfile.name}
                className="modalInputName"
                onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                onClick={() => setModalPlaceholder(false)}
                onBlur={(e) => {
                  if (e.target.value != "") {
                    setModalPlaceholder(false)
                  } else { setModalPlaceholder(true) }
                }}
              />
              <span className={modalPlaceholder ? "modalPlaceholder" : "modalPlaceholderFalse"}>Nome</span>
              <label>Escolha um avatar:</label>
              <div className="avatarList">
                {[1, 2, 3, 4].map((n) => {
                  const url = `/avatars/avatar${n}.png`;
                  return (
                    <Image
                      alt="avatar"
                      key={n}
                      src={url}
                      className={newProfile.avatar_url === url ? "selected" : ""}
                      onClick={() => setNewProfile({ ...newProfile, avatar_url: url })}
                    />
                  );
                })}
              </div>

              <div className="switchGroup">
                <label>Perfil infantil:</label>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={newProfile.isChild}
                    onChange={(e) =>
                      setNewProfile({ ...newProfile, isChild: e.target.checked })
                    }
                  />
                  <span className="slider" />
                </label>
              </div>

              <div className="buttonGroup">
                <button className="cancelButton" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="saveButton" onClick={handleSubmit}>Salvar</button>
              </div>
            </div>
          </div>
        )}
      </div>
  
  );
}