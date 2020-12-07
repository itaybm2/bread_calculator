import React from 'react';
import './App.css';
import Helmet from 'react-helmet';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, withStyles, styled } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia'
import Pic from "./Collage.png";
import Grid from '@material-ui/core/Grid';


const styles = (theme) => ({
    root: {},
    media: {
        height: 0,
        width: 0
    },
    root: {

    }
});

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: { dough_weight: '', hydration: '', starter: '', starter_hydration: '', salt: '' },
            errors: {}
        }
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clearAll = this.clearAll.bind(this);
    }

    calculateIngredients(amounts) {
        var starterWaterPer = amounts.starter / (1 + (1 / amounts.starter_hydration));
        var starterSolidPer = amounts.starter - starterWaterPer;
        var waterPer = amounts.hydration * (1 + amounts.salt + starterSolidPer) - starterWaterPer;
        var flour = amounts.dough_weight / (1 + waterPer + amounts.starter + amounts.salt);
        var starter = amounts.starter * flour;
        var salt = amounts.salt * flour;
        var water = waterPer * flour;
        document.getElementById("result_flour").innerHTML = parseInt(flour) + "g"
        document.getElementById("result_water").innerHTML = parseInt(water) + "g"
        document.getElementById("result_starter").innerHTML = parseInt(starter) + "g"
        document.getElementById("result_salt").innerHTML = parseInt(salt) + "g"
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = this.state.errors;
        let formIsValid = true;

        if (!fields["dough_weight"]) {
            formIsValid = false;
            this.state.errors["dough_weight"] = "Cannot be empty";
        }
        if (!fields["hydration"]) {
            formIsValid = false;
            errors.hydration = "Cannot be empty";
        }
        if (!fields["starter"]) {
            formIsValid = false;
            errors.starter = "Cannot be empty";
        }
        if (!fields["starter_hydration"]) {
            formIsValid = false;
            errors.starter_hydration = "Cannot be empty";
        }
        if (!fields["salt"]) {
            formIsValid = false;
            errors.salt = "Cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit(event) {
        event.preventDefault();
        let errors = this.state.errors;
        if (this.handleValidation()) {
            var dict = {
                dough_weight: this.state.fields.dough_weight,
                starter: parseFloat(this.state.fields.starter) / 100,
                hydration: parseFloat(this.state.fields.hydration) / 100,
                starter_hydration: parseFloat(this.state.fields.starter_hydration) / 100,
                salt: parseFloat(this.state.fields.salt) / 100
            };
            this.calculateIngredients(dict);
        }
        else{
            this.setState({errors});
               }
    }

    clearAll(event) {
        event.preventDefault();
        document.getElementById("result_flour").innerHTML = "0g";
        document.getElementById("result_starter").innerHTML = "0g";
        document.getElementById("result_salt").innerHTML = "0g";
        document.getElementById("result_water").innerHTML = "0g";
        this.setState({
            fields: { dough_weight: '', hydration: '', starter: '', starter_hydration: '', salt: '' },
            errors: {}
        });
    }
    handleChange(field, event) {
        let fields = this.state.fields;
        fields[field] = event.target.value;
        // const value = target.value;
        // const name = target.name;
        this.setState({
            fields
        });
    }


    render() {
        const { classes } = this.props;

        const Typ = withStyles({
            root: {
                color: "#92540d",
            }
        })(Typography);

        const styledBox = withStyles({
            root: {
                display: "flex",
            }
        })(Box);

        return (

            <Box>
                <Helmet>
                    <title>
                        Bread Calculator
                </title>
                </Helmet>
                <Grid container spacing={4} justify="center">
                    <Grid style={{ padding: 50 }} item xs={12}>
                        <Typ variant="h2" component="h1" display="flex">Sourdough Bread Calculator</Typ>
                    </Grid>
                    <Grid item className="root" lg={2}>
                        <Box>
                            <FormControl className="form" onSubmit={this.handleSubmit} >
                                <Typ variant="h5" >Ingredients:</Typ>
                                <TextField
                                    label="Dough Weight"
                                    type="number"
                                    name="dough_weight"
                                    id="dough_weight"
                                    inputmode="numeric"
                                    min="0"
                                    placeholder="Dough Weight in grams"
                                    value={this.state.fields.dough_weight}
                                    error={this.state.errors.dough_weight}
                                    helperText={this.state.errors.dough_weight ? "Cannot be empty" : ""}
                                    onChange={this.handleChange.bind(this, "dough_weight")}
                                />

                                <TextField
                                    label="Hydration"
                                    type="number"
                                    name="hydration"
                                    id="hydration"
                                    min="0"
                                    max="100"
                                    placeholder="Final Hydration"
                                    error={this.state.errors.hydration}
                                    helperText={this.state.errors.hydration ? "Cannot be empty" : ""}
                                    value={this.state.fields.hydration}
                                    onChange={this.handleChange.bind(this, "hydration")}
                                />

                                <TextField
                                    type="number"
                                    label="Starter"
                                    name="starter"
                                    id="starter"
                                    min="0"
                                    max="100"
                                    placeholder="Starter Percentage"
                                    error={this.state.errors.starter}
                                    helperText={this.state.errors.Starter ? "Cannot be empty" : ""}
                                    value={this.state.fields.starter}
                                    onChange={this.handleChange.bind(this, "starter")}
                                />

                                <TextField 
                                    label="Starter Hydration"
                                    type="number"
                                    name="starter_hydration"
                                    id="starter_hydration"
                                    min="0"
                                    max="100"
                                    placeholder="Starter Hydration"
                                    error={this.state.errors.starter_hydration}
                                    helperText={this.state.errors.starter_hydration ? "Cannot be empty" : ""}
                                    value={this.state.fields.starter_hydration}
                                    onChange={this.handleChange.bind(this, "starter_hydration")}
                                />

                                <TextField
                                    label="Salt"
                                    type="number"
                                    name="salt"
                                    errorte
                                    id="salt"
                                    min="0"
                                    max="100"
                                    placeholder="Salt Percentage"
                                    error={this.state.errors.salt}
                                    helperText={this.state.errors.salt ? "Cannot be empty" : ""}
                                    value={this.state.fields.salt}
                                    onChange={this.handleChange.bind(this, "salt")}
                                />

                            </FormControl>
                        </Box>
                    </Grid>
                    <Grid item md={1} justify="center" className="root">
                        <Box display="flex-box">
                            <Typ variant="h5">Totals:</Typ>
                            <Box>
                                <strong>Flour: </strong>
                                <text
                                    id="result_flour"
                                >0g
                                </text>
                            </Box>
                            <Box>
                                <strong>Water: </strong>
                                <text
                                    id="result_water"
                                >0g
                                </text>
                            </Box>
                            <Box>
                                <strong>Starter: </strong>
                                <text
                                    id="result_starter"
                                >0g
                                </text>
                            </Box>
                            <Box>
                                <strong>Salt: </strong>
                                <text
                                    id="result_salt"
                                >0g
                                </text>
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4}>
                        <CardMedia src={Pic} component="img"></CardMedia>
                    </Grid>
                    <Grid item lg={9} spacing={2}>
                        <Box margin={5} display="flex" justifyContent="center">
                            <Box paddingRight="20%">
                                <Button
                                    variant="outlined"
                                    padding="20px"
                                    type="submit"
                                    value="Submit"
                                    gi onClick={this.handleSubmit}
                                >Calculate</Button>
                            </Box>
                            <Box>
                                <Button
                                    border="1px"
                                    padding="40px"
                                    variant="outlined"
                                    onClick={this.clearAll}
                                    className="div_button"
                                >Clear</Button>
                            </Box>
                        </Box>
                    </Grid>
                </Grid >
            </Box>
        );
    }
}

export default withStyles(styles)(App);