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
  Button,
} from "react-bootstrap";
import { Authcontext } from "../../context/auth-context";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import ErrorModel from "../../models/error-model";
import SuccessModel from "../../models/success-model";
import TablePagination from "@material-ui/core/TablePagination";
import { Link } from "react-router-dom";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import { useParams } from "react-router-dom";
import EmailIcon from "@material-ui/icons/Email";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import EventIcon from "@material-ui/icons/Event";
import WcIcon from "@material-ui/icons/Wc";
import ListExperience from "../../components/list-experience";
import ListFormation from "../../components/list-formation";
import ListCompetence from "../../components/list-competence";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

export default function CV() {
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
          `http://localhost:5000/api/condidat/${id}`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.condidat);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  console.log(list);
  console.log(image);

  const [date, setDate] = useState();

  const onchange = (e) => {
    setDate(e.target.value);
  };

 
  return (
    <div style={{ marginTop: "5%" }}>
      <Container>
        
        <Row>
          <Col>
            {list && (
              <Card style={{ width: "18rem" }}>
                <Card.Img
                  variant="top"
                  src={`http://localhost:5000/${list.photo}`}
                />
                <Card.Body>
                  <Card.Title>{list.name}</Card.Title>
                  <Card.Text>
                    <EmailIcon style={{ color: "#42a5f5" }} />
                    {list.email}
                  </Card.Text>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    <PermContactCalendarIcon style={{ color: "#42a5f5" }} />
                    {list.age}
                  </ListGroupItem>
                  <ListGroupItem>
                    <EventIcon style={{ color: "#42a5f5" }} />
                    {list.dateNaissance}
                  </ListGroupItem>
                  <ListGroupItem>
                    <WcIcon style={{ color: "#42a5f5" }} />
                    {list.sexe}
                  </ListGroupItem>
                </ListGroup>
                <Card.Body></Card.Body>
              </Card>
            )}
          </Col>
          <Col xs={8}>
            <ErrorModel error={error} />
            <SuccessModel success={success} />
            {list && <ListExperience id={list._id} />}
            {list && <ListFormation id={list._id} />}
            {list && <ListCompetence id={list._id} />}
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  );
}
