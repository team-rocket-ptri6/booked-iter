import React, { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import ClubInfo from "./ClubInfo";
import ClubMessages from "./ClubMessages";
import BookPanel from "./BookPanel";
import Logo from "../assets/logo.png";
import { useAuth } from "../auth/authContext";
import axios from "axios";
import { ReadBooksPanel } from "./ReadBooksPanel";

function ClubPage() {
  const auth = useAuth();
<<<<<<< HEAD
  const params = useParams(); // params.id is the clubId...
  // clubId in redundant, don't use it. Use params instead
  const [clubId, setClubId] = useState(null);

  const [nav, setNav] = useState('info');
  const [isMember, setIsMember] = useState(true);

  const [clubName, setClubName] = useState('Super Awesome Book Club');
  const [clubDescription, setClubDescription] = useState('');
=======
  const [isMember, setIsMember] = useState(true);
  const [nav, setNav] = useState("info");
  const [clubName, setClubName] = useState("Super Awesome Book Club");
  const [clubDescription, setClubDescription] = useState("");
>>>>>>> a337eb6dd04ab99e1723ac057b0fae87672fe1b9
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [membersUpdated, setMembersUpdated] = useState(false);
  const [adminUpdated, setAdminUpdated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(true);

<<<<<<< HEAD
  const [clubMessages, setClubMessages] = useState([]);
=======
  const params = useParams();
>>>>>>> a337eb6dd04ab99e1723ac057b0fae87672fe1b9

  useEffect(() => {
    axios
      .get(`http://localhost:8080/clubs/${params.id}`)
      .then((response) => {
        // console.log(response.data);
        setClubId(response.data.club_id);
        setClubName(response.data.club_name);
        setClubDescription(response.data.description);
        setMembers(response.data.members);
        setClubMessages(response.messages);
        setMemberId(response.data.memberId);
        response.data.members.forEach((m) => {
          if (m.username === auth.username) setIsAdmin(m.isAdmin);
        });
      });
  }, [params.id, membersUpdated, adminUpdated]);

  return (
    <div className="clubInfo">
      {!isMember ? (
        "We're sorry, but you are not a member of this club"
      ) : (
        <div>
          <Link to="/profile">
            <img className="logo" src={Logo} />
          </Link>
          <h1 className="clubTitle">{clubName}</h1>
          <br />
          <h2 className="leftText">About {clubName}</h2>
          <h3 className="descriptionText">{clubDescription}</h3>
          <nav id="clubNav">
            <ul>
<<<<<<< HEAD
              <li className="list-none" onClick={() => setNav('info')}>
                Info
              </li>
              <li className="list-none" onClick={() => setNav('messages')}>
                Messages
              </li>
              <li className="list-none" onClick={() => setNav('books')}>
                Books
              </li>
              <li className="list-none" onClick={() => setNav('read')}>
=======
              <li className="list-none" onClick={() => setNav("info")}>
                Info
              </li>
              <li className="list-none" onClick={() => setNav("messages")}>
                Messages
              </li>
              <li className="list-none" onClick={() => setNav("books")}>
                Books
              </li>
              <li className="list-none" onClick={() => setNav("read")}>
>>>>>>> a337eb6dd04ab99e1723ac057b0fae87672fe1b9
                Read
              </li>
            </ul>
          </nav>
          <div className="clubInfo">
            {nav === "info" && (
              <ClubInfo
                setMembersUpdated={setMembersUpdated}
                membersUpdated={membersUpdated}
                members={members}
                clubId={clubId}
                adminUpdated={adminUpdated}
                setAdminUpdated={setAdminUpdated}
                isAdmin={isAdmin}
              />
            )}
            {nav === "messages" && <ClubMessages />}
            {nav === "books" && <BookPanel memberId={memberId} />}
            {nav === "read" && <ReadBooksPanel />}
          </div>
        </div>
      )}
    </div>
  );
}

export default ClubPage;
