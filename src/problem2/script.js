import React from "react";
import ReactDOM from "react-dom";
import Form from "./form";
import './style.css';
import Grid from '@material-ui/core/Grid';


const rootEl = document.getElementById("root");

ReactDOM.render(
    <div className="App">
        <Grid item xs={3}>
            <Form/>,
        </Grid>
    </div>,
    rootEl
);
