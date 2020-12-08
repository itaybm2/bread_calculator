import React from 'react';
import './App.css';
import Helmet from 'react-helmet';
import FormControl from '@material-ui/core/FormControl';
import { createMuiTheme, withStyles, makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormLabel from '@material-ui/core/FormLabel';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia'
import Pic from "./Collage.png";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
    between(x, min, max) {
        return x >= min && x <= max;
    }

    handleValidation() {
        let fields = this.state.fields;
        let errors = this.state.errors;
        let formIsValid = true;

        for (var key in fields) {
            if (!fields[key]) {
                formIsValid = false;
                errors[key] = "Cannot be empty";
            }

            if (fields[key] < 0) {
                formIsValid = false;
                errors[key] = "Field must be in range [1,100]";
            }

            if (key != "dough_weight") {
                if (!(this.between(fields[key], 0, 100))) {
                    formIsValid = false;
                    errors[key] = "Field must be in range [1,100]";
                }
            }

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
            this.setState({ errors: {} })
        }
        else {
            this.setState({ errors });
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

        const Typ = withStyles({
            root: {
                color: "#4E4E4E",
            }
        })(Typography);


        return (
            <Box margin={5}>
                <Helmet>
                    <title>
                        Bread Calculator
                    </title>
                    
                </Helmet>
                <Grid container spacing={5} align='center' justify='space-around'>
                    <Grid style={{ padding: 50 }} item xs={12} sm={12}>
                        <Typ variant="h3" component="h1" >Sourdough Bread Calculator</Typ>
                    </Grid>


                    <Grid item align='center' lg={3} xs={11}>
                        <Box justify='center' justifyContent='center'
                            style={{
                                height: '100%',
                                border: 'solid',
                                borderWidth: 1,
                                borderColor: 'black',
                                borderRadius: 5,
                                background: 'white',
                            }}>
                            <Grid item md={12} sm={12}>
                                <Typ variant="h5" component="h1" >Ingredients:</Typ>
                            </Grid>
                            <Grid container align='center' justify='center'>

                                <FormControl onSubmit={this.handleSubmit} >
                                    <Grid item xs={12} sm={12} md={12}>
                                        <TextField
                                            label="Dough Weight"
                                            InputProps={{
                                                inputProps: {
                                                    min: 0
                                                }
                                            }}
                                            name="dough_weight"
                                            id="dough_weight"
                                            inputmode="numeric"
                                            placeholder="Dough Weight in grams"
                                            value={this.state.fields.dough_weight}
                                            error={this.state.errors.dough_weight}
                                            helperText={this.state.errors.dough_weight ? this.state.errors.dough_weight : ""}
                                            onChange={this.handleChange.bind(this, "dough_weight")}
                                        />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <TextField
                                            label="Hydration"
                                            name="hydration"
                                            id="hydration"
                                            InputProps={{
                                                inputProps: {
                                                    min: '0', max: '100'
                                                }
                                            }}
                                            placeholder="Final Hydration"
                                            error={this.state.errors.hydration}
                                            helperText={this.state.errors.hydration ? this.state.errors.hydration : ""}
                                            value={this.state.fields.hydration}
                                            onChange={this.handleChange.bind(this, "hydration")}
                                        />
                                    </Grid>

                                    <Grid item sm={12}>
                                        <TextField
                                            label="Starter"
                                            name="starter"
                                            id="starter"
                                            min="0"
                                            max="100"
                                            placeholder="Starter Percentage"
                                            error={this.state.errors.starter}
                                            helperText={this.state.errors.starter ? this.state.errors.starter : ""}
                                            value={this.state.fields.starter}
                                            onChange={this.handleChange.bind(this, "starter")}
                                        />
                                    </Grid>

                                    <Grid item sm={12}>
                                        <TextField
                                            label="Starter Hydration"
                                            name="starter_hydration"
                                            id="starter_hydration"
                                            placeholder="Starter Hydration"
                                            error={this.state.errors.starter_hydration}
                                            helperText={this.state.errors.starter_hydration ? this.state.errors.starter_hydration : ""}
                                            value={this.state.fields.starter_hydration}
                                            onChange={this.handleChange.bind(this, "starter_hydration")}
                                        />
                                    </Grid>

                                    <Grid item sm={12}>
                                        <TextField
                                            label="Salt"
                                            name="salt"
                                            errorte
                                            id="salt"
                                            placeholder="Salt Percentage"
                                            error={this.state.errors.salt}
                                            helperText={this.state.errors.salt ? "Cannot be empty" : ""}
                                            value={this.state.fields.salt}
                                            onChange={this.handleChange.bind(this, "salt")}
                                        />
                                    </Grid>
                                    <Grid item sm={12}>
                                        <Box margin={5} display="flex" justifyContent="center">
                                            <Box paddingRight="20%">
                                                <Button
                                                    variant="outlined"
                                                    type="submit"
                                                    value="Submit"
                                                    gi onClick={this.handleSubmit}
                                                >Calculate</Button>
                                            </Box>
                                            <Box>
                                                <Button
                                                    border="1px"
                                                    variant="outlined"
                                                    onClick={this.clearAll}
                                                    className="div_button"
                                                >Clear</Button>
                                            </Box>
                                        </Box>
                                    </Grid>
                                </FormControl>
                            </Grid>

                        </Box>
                    </Grid>

                    <Grid item xs={9} lg={3}>
                        <Box style={{
                            border: 'solid',
                            height: '100%',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            background: 'white',
                        }}>
                            <Grid item xs={12} sm={12}>
                                <Typ style={{ paddingBottom: 20 }} variant="h5" component="h1">Totals:</Typ>
                            </Grid>
                            <Grid item sm={12}>
                                <Box display="flex-box">
                                    <Typography variant="h6" display="inline" >Flour: </Typography>
                                    <Typography variant="h6" display="inline" id="result_flour"
                                    >0g
                        </Typography>
                                </Box>
                            </Grid>
                            <Grid item sm={12}>
                                <Box margin={4}>
                                    <Typography variant="h6" display="inline" >Water: </Typography>
                                    <Typography variant="h6" display="inline" id="result_water"
                                    >0g
                        </Typography>
                                </Box>
                                <Grid item sm={12}>
                                    <Box margin={4}>
                                        <Typography variant="h6" display="inline" >Starter: </Typography>
                                        <Typography variant="h6" display="inline" id="result_starter"
                                        >0g
                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sm={12}>
                                    <Box margin={4}>
                                        <Typography variant="h6" display="inline" >Salt: </Typography>
                                        <Typography variant="h6" display="inline" id="result_salt"
                                        >0g
                                </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                    <Grid alignContent='center' align='center' item xs={12} sm={8} md={4}>
                        <CardMedia src={Pic} component="img"></CardMedia>
                    </Grid>
                </Grid >
            </Box >


        );
    }
}

export default App;