import React, { Component } from 'react';

export default class MediaMetionsCore extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaMentionsApiUrl: "https://dl9w9nvr4a.execute-api.eu-west-1.amazonaws.com/Prod/v1/mentions",
            sourcesList: [
                "www.nytimes.com",
                "cnn.com",
                "bloomberg.com/news",
                "forbes.com",
                "wsj.com",
                "timesofindia.indiatimes.com",
                "theguardian.com/international",
                "ft.com",
                "yahoo.com/news"

            ],
            bindsource: [],
            key: "home",
            setKey: "home"
        };
    }



    componentDidMount = () => {

        var Sourse = this.state.sourcesList.map(element => {
            return { value: element, display: element }
        });
        this.setState({
            bindsource: [{ value: '', display: '(Select your source)' }].concat(Sourse)
        });
    }

    createPostBody = () => {
        var host_name = document.getElementById('sourcesList').value
        var year_month = document.getElementById('filterBody').value
        var postBody = '';
        if (host_name !== '') {
            postBody = '{"topic":{"host_name":"' + host_name +'","year_month":' + year_month + '}}';
        }
        return postBody;
        //return JSON.stringify(postBody, undefined, 4);
    }

    dataStatus = () => {
        document.getElementById("loader-wrapper").style.display = "block";
        var body = '{  "getAllData" : 1}';

            var url = this.state.mediaMentionsApiUrl;
            this.sendXHRcall(url, body);

    }

    dataSubmit = () => {
        document.getElementById("loader-wrapper").style.display = "block";
        var postBody = this.createPostBody();
        if (postBody === "{}") {
            alert("Selected Invalid Source");
        }
        else {
            var url = this.state.mediaMentionsApiUrl;
            this.sendXHRcall(url, postBody);
        }
    }

    sendXHRcall = (url, body) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "text/plain");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: body,
            redirect: 'follow'
        };

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => {
                this.displayResponse(result);
            })
            .catch(error => {
                this.displayResponse(error)
            });
    }

    displayResponse = (response) => {
        var textedJson = JSON.stringify(response, undefined, 4);
        document.getElementById("previewArea").value = textedJson;
        document.getElementById("loader-wrapper").style.display = "none";
    }

    copyToClipboard = () => {
        var copyText = document.getElementById("previewArea");
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("Content Copied" + copyText.value);
    }

    render() {
        const mystyle = {
            padding: "12px 20px",
            boxSizing: "border - box",
            border: "2px solid #ccc",
            borderRadius: "4px",
            backgroundColor: "#f8f8f8",
            resize: "none"
        };


        return (
            <div>
                <div id="loader-wrapper">
                    <div id="loader"></div>
                </div>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title">Media Mentions UI access</h4>
                                        {/* <p className="card-category">Customize your payload</p> */}
                                    </div>
                                    <form id="payloadForm">
                                    <div className="card-body">                                    
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Source</label>
                                                        <select type="text" className="form-control" name="sourcesList" id="sourcesList">
                                                            {this.state.bindsource.map((source) => <option key={source.value} value={source.value}>{source.display}</option>)}
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Filter</label>
                                                        <input type="text" className="form-control" name="filterBody" id="filterBody" />
                                                    </div>
                                                </div>
                                                <div className="col-md-2">
                                                    <div className="form-group">
                                                        <button type="reset" className="btn btn-primary pull-right">Clear</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" id="status" className="btn btn-primary pull-right" onClick={this.dataStatus}>Get Status</button>
                                            <button type="button" id="submit" className="btn btn-primary pull-right" onClick={this.dataSubmit}>Submit</button>
                                            <div className="clearfix"></div>
                                            <hr />                               
                                    </div>
                                    <div className="card-body">
                                        <h3>Media Mentions Result</h3>
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="form-group">

                                                    <textarea style={mystyle} className="form-control" name="previewArea" id="previewArea" rows={10} disabled>
                                                    </textarea>
                                                </div>
                                            </div>
                                        </div>
                                        <button type="button" id="clipboard" className="btn btn-primary pull-right" onClick={this.copyToClipboard}>Copy to Clipboard</button>
                                    </div>
                                    </form>
                                    <br />
                                    {/* <div className="card-footer  card-header-primary">         
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}