import React from 'react';
import './App.css';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia'
import Pic from "./Collage.png";
import Pic1 from "./pic1.png";


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
        let errors = {};
        let formIsValid = true;

        if (!fields["dough_weight"]) {
            formIsValid = false;
            errors["dough_weight"] = "Cannot be empty";
        }
        if (!fields["hydration"]) {
            formIsValid = false;
            errors["hydration"] = "Cannot be empty";
        }
        if (!fields["starter"]) {
            formIsValid = false;
            errors["starter"] = "Cannot be empty";
        }
        if (!fields["starter_hydration"]) {
            formIsValid = false;
            errors["starter_hydration"] = "Cannot be empty";
        }
        if (!fields["salt"]) {
            formIsValid = false;
            errors["salt"] = "Cannot be empty";
        }
        this.setState({ errors: errors });
        return formIsValid;
    }

    handleSubmit(event) {
        event.preventDefault();
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
        const {classes} = this.props;
        const styles =
        {

            media: {
                height:'50%'
            }
        };
        return (
            <Box>
                <Typography component="h1" variant="h4">Sourdough Calculator</Typography>
                <Box id="calc" className='flex-container'>
                    <Box className="column1">
                        <h1 id="heading">Ingredients:</h1>
                        <form id="calculator-form" onSubmit={this.handleSubmit} >
                            <Box class="form-group">
                                <InputLabel>Dough Weight (g)</InputLabel>
                                <TextField
                                    type="number"
                                    name="dough_weight"
                                    id="dough_weight"
                                    inputmode="numeric"
                                    min="0"
                                    placeholder="Dough Weight in grams"
                                    value={this.state.fields.dough_weight}
                                    onChange={this.handleChange.bind(this, "dough_weight")}
                                />
                                <Box>
                                    <span style={{ color: "red" }}>{this.state.errors["dough_weight"]}</span>
                                </Box>
                            </Box>

                            <Box class="form-group">
                                <InputLabel for="formGroupExampleInput">Final Hydration (%)</InputLabel>
                                <TextField
                                    type="number"
                                    name="hydration"
                                    id="hydration"
                                    min="0"
                                    max="100"
                                    placeholder="Final Hydration"
                                    value={this.state.fields.hydration}
                                    onChange={this.handleChange.bind(this, "hydration")}
                                />
                                <Box>
                                    <span style={{ color: "red" }}>{this.state.errors["hydration"]}</span>
                                </Box>
                            </Box>

                            <Box class="form-group">
                                <InputLabel for="formGroupExampleInput">Starter (%)</InputLabel>
                                <TextField
                                    type="number"
                                    name="starter"
                                    id="starter"
                                    min="0"
                                    max="100"
                                    placeholder="Starter Percentage"
                                    value={this.state.fields.starter}
                                    onChange={this.handleChange.bind(this, "starter")}
                                />
                                <Box>
                                    <span style={{ color: "red" }}>{this.state.errors["starter"]}</span>
                                </Box>
                            </Box>

                            <Box class="form-group">
                                <InputLabel for="formGroupExampleInput">Starter Hydration (%)</InputLabel>
                                <TextField
                                    type="number"
                                    name="starter_hydration"
                                    id="starter_hydration"
                                    min="0"
                                    max="100"
                                    placeholder="Starter Hydration"
                                    value={this.state.fields.starter_hydration}
                                    onChange={this.handleChange.bind(this, "starter_hydration")}
                                />
                                <Box>
                                    <span style={{ color: "red" }}>{this.state.errors["starter_hydration"]}</span>
                                </Box>
                            </Box>

                            <Box class="form-group">
                                <InputLabel for="formGroupExampleInput">Salt (%)</InputLabel>
                                <TextField
                                    type="number"
                                    name="salt"
                                    id="salt"
                                    min="0"
                                    max="100"
                                    placeholder="Salt Percentage"
                                    value={this.state.fields.salt}
                                    onChange={this.handleChange.bind(this, "salt")}
                                />
                                <Box>
                                    <span className='error' style={{ color: "red" }}>{this.state.errors["salt"]}</span>
                                </Box>
                            </Box>
                            <Box className="div_button">
                                <Button type="submit" value="Submit">Calculate</Button>
                                <Button
                                    onClick={this.clearAll}
                                    className="div_button"
                                >Clear</Button>
                            </Box>
                        </form>
                    </Box>
                    <Box class="column2" onChange={this.handleChange} >
                        <h1>Totals:</h1>
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
                            >
                                0g
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
                {/* <CardMedia src={Pic} styles={styles.media} component="img" /> */}
                </Box>
            </Box>
        );
    }
}

export default App;