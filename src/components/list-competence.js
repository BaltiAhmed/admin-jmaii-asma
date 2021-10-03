import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {
  Container,
  Row,
  Col,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Authcontext } from "../context/auth-context";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useParams } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import EventIcon from "@material-ui/icons/Event";
import WcIcon from "@material-ui/icons/Wc";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function ListCompetence(props) {
  const classes = useStyles();

  const [list, setList] = useState();
  const [image, setImage] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);
  const [page, setPage] = useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const auth = useContext(Authcontext);
  const id = useParams().id;

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/competance/codidat/${props.id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.competences);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, [props.id]);

  console.log(list);

  return (
    <div>
      <h3>Compétence profesionnel</h3>
      {list &&
        list.map((item, index) => (
          <Card>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>
                  {" "}
                  {item.titre}: {item.niveau}
                </p>
              </blockquote>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
}
