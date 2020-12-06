<Box className={classes.root} display="flex-box" justifyContent="center" alignItems="center">
<Typ align="center" variant="h3" >Sourdough Bread Calculator</Typ>
<Box flexDirection="row" display="flex" justifyContent="center" borderRadius={16} bgcolor="#FFCC99" border={1} borderColor="black">
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
            value={this.state.fields.salt}
            onChange={this.handleChange.bind(this, "salt")}
        />
        <Box margin={5} display="flex" justifyContent="center">
            <Box paddingRight="20%">
                <Button
                    variant="outlined"
                    padding="20px"
                    type="submit"
                    value="Submit"
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
    </FormControl>
    <FormControl width="50">
        <Typ variant="h5">Totals:</Typ>
        <div>
            <strong>Flour: </strong>
            <text
                id="result_flour"
            >0g
            </text>
        </div>
        <div>
            <strong>Water: </strong>
            <text
                id="result_water"
            >0g
</text>
        </div>
        <div>
            <strong>Starter: </strong>
            <text
                id="result_starter"
            >0g
</text>
        </div>
        <div>
            <strong>Salt: </strong>
            <text
                id="result_salt"
            >0g
</text>
        </div>
    </FormControl>
</Box>
<Box display="flex" flexDirection="row" style={{width:"50%"}}>
    <CardMedia src={Pic} component="img"></CardMedia>
</Box>
</Box>