import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events")
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleBook = (id) => {
    fetch("http://127.0.0.1:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEvents((prevEvents) =>
            prevEvents.map((event) =>
              event.id === id ? { ...event, booked: event.booked + 1 } : event
            )
          );
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.error("Error booking event:", error));
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h3" align="center" gutterBottom>
        Disney Park Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  {event.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.description}
                </Typography>
                <Typography variant="body1" style={{ marginTop: "10px" }}>
                  Date: {event.date}
                  <br />
                  Capacity: {event.booked}/{event.capacity}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color={event.booked >= event.capacity ? "error" : "primary"}
                  onClick={() => handleBook(event.id)}
                  disabled={event.booked >= event.capacity}
                >
                  {event.booked >= event.capacity ? "Fully Booked" : "Book Now"}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
