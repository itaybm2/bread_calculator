<div>
<h1 className="mainTitle">Sourdough Bread Calculator</h1>
<div id="calc" className='flex-container'>
    <div className="column1">
        <h1 id="heading">Ingredients:</h1>
        <form id="calculator-form" onSubmit={this.handleSubmit} >
            <div class="form-group">
                <label>Dough Weight (g)</label>
                <input
                    type="number"
                    name="dough_weight"
                    id="dough_weight"
                    inputmode="numeric"
                    min="0"
                    placeholder="Dough Weight in grams"
                    value={this.state.fields.dough_weight}
                    onChange={this.handleChange.bind(this, "dough_weight")}
                />
                <div>
                    <span style={{ color: "red" }}>{this.state.errors["dough_weight"]}</span>
                </div>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput">Final Hydration (%)</label>
                <input
                    type="number"
                    name="hydration"
                    id="hydration"
                    min="0"
                    max="100"
                    placeholder="Final Hydration"
                    value={this.state.fields.hydration}
                    onChange={this.handleChange.bind(this, "hydration")}
                />
                <div>
                    <span style={{ color: "red" }}>{this.state.errors["hydration"]}</span>
                </div>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput">Starter (%)</label>
                <input
                    type="number"
                    name="starter"
                    id="starter"
                    min="0"
                    max="100"
                    placeholder="Starter Percentage"
                    value={this.state.fields.starter}
                    onChange={this.handleChange.bind(this, "starter")}
                />
                <div>
                    <span style={{ color: "red" }}>{this.state.errors["starter"]}</span>
                </div>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput">Starter Hydration (%)</label>
                <input
                    type="number"
                    name="starter_hydration"
                    id="starter_hydration"
                    min="0"
                    max="100"
                    placeholder="Starter Hydration"
                    value={this.state.fields.starter_hydration}
                    onChange={this.handleChange.bind(this, "starter_hydration")}
                />
                <div>
                    <span style={{ color: "red" }}>{this.state.errors["starter_hydration"]}</span>
                </div>
            </div>

            <div class="form-group">
                <label for="formGroupExampleInput">Salt (%)</label>
                <input
                    type="number"
                    name="salt"
                    id="salt"
                    min="0"
                    max="100"
                    placeholder="Salt Percentage"
                    value={this.state.fields.salt}
                    onChange={this.handleChange.bind(this, "salt")}
                />
                <div>
                    <span className='error' style={{ color: "red" }}>{this.state.errors["salt"]}</span>
                </div>
            </div>
            <div className="div_button">
                <button type="submit" value="Submit">Calculate</button>
                <button
                    onClick={this.clearAll}
                    className="div_button"
                >Clear</button>
            </div>
        </form>
    </div>
    <div class="column2" onChange={this.handleChange} >
        <h1>Totals:</h1>
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
    </div>
    {/* <img class="img1" src={Pic} /> */}
</div>
</div>