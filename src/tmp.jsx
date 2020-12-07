<Grid container style={{ flexGrow: 1 }}>
                <Helmet>
                    <title>
                        Bread Calculator
                </title>
                </Helmet>
                <Grid my={3} container spacing={2} style={{ flexGrow: 1 }} align='center' justify='space-evenly'>
                    <Grid style={{ flexGrow: 1, padding: 50 }} item sm={12}>
                        <Typ variant="h3" component="h1" >Sourdough Bread Calculator</Typ>
                    </Grid>

                    <Grid item container justify='space-around' direction="row" md={4} sm={8} xs={12}
                        style={{
                            border: 'solid',
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 5,
                            flexgrow: 1,
                            background: 'white',
                        }}>

                        <FormControl onSubmit={this.handleSubmit} >
                            <Grid item sm={12}>
                                <Typ variant="h5" component="h1" >Ingredients:</Typ>
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    label="Dough Weight"
                                    type="number"
                                    InputProps={{
                                        inputProps:{
                                            min:0
                                        }
                                    }}
                                    name="dough_weight"
                                    id="dough_weight"
                                    inputmode="numeric"
                                    placeholder="Dough Weight in grams"
                                    value={this.state.fields.dough_weight}
                                    error={this.state.errors.dough_weight}
                                    helperText={this.state.errors.dough_weight ? "Cannot be empty" : ""}
                                    onChange={this.handleChange.bind(this, "dough_weight")}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField
                                    label="Hydration"
                                    type="number"
                                    name="hydration"
                                    id="hydration"
                                    InputProps={{
                                        inputProps:{
                                            min:'0',max:'100'
                                        }
                                    }}
                                    placeholder="Final Hydration"
                                    error={this.state.errors.hydration}
                                    helperText={this.state.errors.hydration ? "Cannot be empty" : ""}
                                    value={this.state.fields.hydration}
                                    onChange={this.handleChange.bind(this, "hydration")}
                                />
                            </Grid>

                            <Grid item sm={12}>
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
                            </Grid>

                            <Grid item sm={12}>
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
                            </Grid>

                            <Grid item sm={12}>
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
                    <Grid item md={4} sm={8} xs={12}
                        style={{
                            border: 'solid',
                            borderWidth: 1,
                            borderColor: 'black',
                            flexgrow: 1,
                            borderRadius: 5,
                            background: 'white'
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
                    </Grid>
                </Grid >
                {/* <Grid item xs={12} sm={5} >
                    <CardMedia src={Pic} component="img"></CardMedia>
                </Grid> */}
            </Grid>
            