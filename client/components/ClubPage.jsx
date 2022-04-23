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
  const [isMember, setIsMember] = useState(true);
  const [nav, setNav] = useState("info");
  const [clubName, setClubName] = useState("Super Awesome Book Club");
  const [clubDescription, setClubDescription] = useState("");
  const [members, setMembers] = useState([]);
  const [memberId, setMemberId] = useState("");
  const [membersUpdated, setMembersUpdated] = useState(false);
  const [adminUpdated, setAdminUpdated] = useState(false);
  const [clubId, setClubId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(true);

  const params = useParams();

  useEffect(() => {
    axios.get(`http://localhost:8080/clubs/${params.id}`).then((response) => {
      // console.log(response.data);
      setClubId(response.data.club_id);
      setClubName(response.data.club_name);
      setClubDescription(response.data.description);
      setMembers(response.data.members);
      setMemberId(response.data.memberId);
      response.data.members.forEach((m) => {
        if (m.username === auth.username) setIsAdmin(m.isAdmin);
      });
    });
  }, [params.id, membersUpdated, adminUpdated, clubDescription]);

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
                setClubDescription={setClubDescription}
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
