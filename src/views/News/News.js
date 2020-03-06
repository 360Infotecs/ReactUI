import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import swal from 'sweetalert';



export default class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JsonFormat: "",
            ArticleList: [],
            tableData: [],
            ArticleData: "",
            setShow: false,
            show: false,
            ArticleText: "",
            articleTitle: "",
            ArticleSource: "",
            ArticleEntities: [],
            loadiing: false,
            todaydate: new Date(),
            alert: false
        };
        this.jsons = "";
        this.arr = [];
        this.no = 0;
        this.APIStatus = null;
        this.flag = false;

    }

    componentDidMount = () => {
        var date = new Date();

        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        var today = year + "-" + month + "-" + day;

        document.getElementById('end_date').value = today;
    }

    renderTableHeader() {
        if (this.state.ArticleList.length !== 0) {
            let header = Object.keys(this.state.ArticleList[1]);
            //console.log(header);
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }

    renderTableData() {
        if (this.state.ArticleList.length !== 0) {
            return this.state.ArticleList.map((Article, index) => {
                const { No, Source, Classification, Article_Path } = Article //destructuring
                return (
                    <tr key={No}>
                        <td>{No}</td>
                        <td>{Source}</td>
                        {/* <td>{News_Title}</td> */}
                        <td>{Classification}</td>
                        <td>{Article_Path}</td>
                    </tr>
                )
            })
        }
        else {
            return (
                <tr>
                    <td></td>
                    <td colSpan={2}><h3>No Data Found....</h3></td>
                </tr>
            )
        }
    }

    handleClose = () => {
        this.setState({ setShow: false });
    }

    handleShow = () => {
        this.setState({ setShow: true });
    }

    ListArticle(urls) {
        for (var index in urls) {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");

            var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(urls[index], requestOptions)
                .then(response => response.json())
                .then(json => {
                    var arr = json.results, i, j = "", x = "", fd = this.arr;
                    console.log(arr);
                    if (arr.length !== 0) {
                        for (i in arr) {
                            for (x in arr[i].classification_1.classes) {
                                this.no = this.no + 1;
                                j += '{"No":' + this.no + ',"Source":"' + arr[i].source + '",';
                                //j += '"News_Title":"' + arr[i].source + '",';
                                j += '"Classification":"' + arr[i].classification_1.classes[x] + '",';
                                j += '"Article_Path":"' + arr[i].view_article_path + '"},';
                            }
                        }
                        j = j.slice(0, -1);
                        j = '[' + j + ']';
                        var myJSON = JSON.stringify(j);
                        var xx = JSON.parse(myJSON);
                        xx = JSON.parse(xx);
                        this.arr = fd.concat(xx);
                        this.setState({
                            ArticleList: this.arr
                        });

                        document.getElementById("loader-wrapper").style.display = "none";

                    }
                })
                .catch(error => console.log('error', error));
        }

    }

    addEntity = () => {
        var jurisdiction = document.getElementById("jurisdiction").value;
        var entityId = document.getElementById("entity_id").value;
        var entityType = document.getElementById("entity_type").value;
        var names = document.getElementById("names").value;
        var nameArr = names.split(',');
        var nameJaon = JSON.stringify(nameArr);
        var startDate = document.getElementById("start_date").value;
        var endDate = document.getElementById("end_date").value;
        var flag = false;

        if (jurisdiction === "Select Country") {
            var element1 = document.getElementById("jurisdiction");
            element1.classList.add("error");
        } else {
            if (jurisdiction !== "Select Country" && entityId !== "" && entityType !== "None" && names !== "" && startDate !== "") {
                flag = true;
            }
        }

        if (entityId === "") {
            var element2 = document.getElementById("entity_id");
            element2.classList.add("error");
        } else {
            if (jurisdiction !== "Select Country" && entityId !== "" && entityType !== "None" && names !== "" && startDate !== "") {
                flag = true;
            }
        }

        if (entityType === "None") {
            var element3 = document.getElementById("entity_type");
            element3.classList.add("error");
        } else {
            if (jurisdiction !== "Select Country" && entityId !== "" && entityType !== "None" && names !== "" && startDate !== "") {
                flag = true;
            }
        }

        if (names === "") {
            var element4 = document.getElementById("names");
            element4.classList.add("error");
        } else {
            if (jurisdiction !== "Select Country" && entityId !== "" && entityType !== "None" && names !== "" && startDate !== "") {
                flag = true;
            }
        }

        if (startDate === "") {
            var element5 = document.getElementById("start_date");
            element5.classList.add("error");
        } else {
            if (jurisdiction !== "Select Country" && entityId !== "" && entityType !== "None" && names !== "" && startDate !== "") {
                flag = true;
            }
        }

        if (flag === true) {
            if (this.jsons === "") {
                this.jsons = '[{"entity_id":"' + entityId + '","names":' + nameJaon + ',"jurisdiction":"' + jurisdiction + '","entity_type":"' + entityType;
                if (startDate !== "" || startDate !== null) {
                    this.jsons = this.jsons + '","start_date": "' + startDate;
                }

                if (endDate !== "" || endDate !== null) {
                    this.jsons = this.jsons + '","end_date": "' + endDate;
                }
                this.jsons = this.jsons + '"}]'
            }
            else {
                var fiestEntity = this.jsons.slice(0, -1);
                this.jsons = fiestEntity + ',{"entity_id":"' + entityId + '","names":' + nameJaon + ',"jurisdiction":"' + jurisdiction + '","entity_type":"' + entityType;
                if (startDate !== "" || startDate !== null) {
                    this.jsons = this.jsons + '","start_date": "' + startDate;
                }

                if (endDate !== "" || endDate !== null) {
                    this.jsons = this.jsons + '","end_date": "' + endDate;
                }

                this.jsons = this.jsons + '"}]'
            }
            this.setState({ JsonFormat: this.jsons });
            document.getElementById("payloadForm").reset();
            this.componentDidMount();
        }
    }


    myStopFunction() {
        clearInterval(this.APIStatus);
    }

    postAPIRequest = () => {
        this.setState({ ArticleList: [] });
        var url = "https://ypgfg7d5t6.execute-api.eu-west-1.amazonaws.com/Prod/v1/entity-news";
        var method = 'POST';
        // var body = '[{"entity_id":"de00a1eaa0","names":["Dell"],"jurisdiction":"UK","entity_type":"Organization","start_date": "2005-01-20","end_date": "2020-03-04"}]';
        if (this.state.JsonFormat !== "") {
            document.getElementById("loader-wrapper").style.display = "block";
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "text/plain");

            var requestOptions = {
                method: method,
                headers: myHeaders,
                body: this.state.JsonFormat,
                redirect: 'follow'
            };

            fetch(url, requestOptions)
                .then(response => response.text())
                .then(json => {
                    json = '{"News":' + json + '}';
                    var jsObj = JSON.parse(json);
                    var key, arr = [], i, j;

                    key = Object.keys(jsObj.News);
                    for (j in key) {

                        if (jsObj.News[key[j]].status === "done") {
                            this.myStopFunction();
                            for (i in jsObj.News[key[j]].classifications) {
                                arr.push(jsObj.News[key[j]].classifications[i]._links.articles);
                            }
                        }
                        else {
                            if (this.flag !== true) {
                                this.APIStatus = setInterval(this.postAPIRequest, 30000);
                                this.flag = true;
                            }
                        }
                    }
                    this.ListArticle(arr);
                    this.jsons = "";
                })
                .catch(error => console.log('error', error));
        }
        else {
            this.setState({ alert: true });
            swal({
                title: "Information!",
                text: "Generate json request before submit",
                icon: "info",
                timer: 2000,
                button: false
              })
            //alert("Please fill the required fields");
        }
    }

    GetArticleURL = () => {
        document.getElementById('myTable').onclick = function (event) {
            event = event || window.event; //for IE8 backward compatibility
            var target = event.target || event.srcElement; //for IE8 backward compatibility
            while (target && target.nodeName !== 'TR') {
                target = target.parentElement;
            }
            var cells = target.cells;
            if (!cells.length || target.parentNode.nodeName === 'THEAD') {
                return;
            }
            var celVal = cells[3].innerHTML;
            //console.log(celVal);
            // AP call
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            var jsonData;
            fetch(celVal, requestOptions)
                .then(response => response.json())
                .then(json => {
                    jsonData = json;

                    this.setState({
                        ArticleText: jsonData.results.text,
                        articleTitle: jsonData.results.title,
                        ArticleSource: jsonData.results.source,
                        ArticleEntities: jsonData.results.entities
                    });
                    this.handleShow();
                })
                .catch(error => console.log('error', error));
        }.bind(this)
    }


    removeError = (string) => {
        var element = document.getElementById(string);
        if (element.nodeName === "SELECT") {

            if (element.value !== "Select Country" || element.value !== "None") {
                element.classList.remove("error");
            }
        }
        else if (element.nodeName === "INPUT") {
            if (element.value !== "") {
                element.classList.remove("error");
            }
        }
        else if (element.nodeName === "TEXTAREA") {
            if (element.value !== "") {
                element.classList.remove("error");
            }
        }
    }

    render() {
        const { loading } = this.state
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
                                        <h4 className="card-title">Payload</h4>
                                        <p className="card-category">Customize your payload</p>
                                    </div>
                                    <div className="card-body">
                                        <form id="payloadForm">
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Jurisdiction</label>
                                                        <select onChange={() => this.removeError("jurisdiction")} className="form-control" name="jurisdiction" id="jurisdiction">
                                                            <option>Select Country</option>
                                                            <option value="AF">Afghanistan</option>
                                                            <option value="AX">Åland Islands</option>
                                                            <option value="AL">Albania</option>
                                                            <option value="DZ">Algeria</option>
                                                            <option value="AS">American Samoa</option>
                                                            <option value="AD">Andorra</option>
                                                            <option value="AO">Angola</option>
                                                            <option value="AI">Anguilla</option>
                                                            <option value="AQ">Antarctica</option>
                                                            <option value="AG">Antigua and Barbuda</option>
                                                            <option value="AR">Argentina</option>
                                                            <option value="AM">Armenia</option>
                                                            <option value="AW">Aruba</option>
                                                            <option value="AU">Australia</option>
                                                            <option value="AT">Austria</option>
                                                            <option value="AZ">Azerbaijan</option>
                                                            <option value="BS">Bahamas</option>
                                                            <option value="BH">Bahrain</option>
                                                            <option value="BD">Bangladesh</option>
                                                            <option value="BB">Barbados</option>
                                                            <option value="BY">Belarus</option>
                                                            <option value="BE">Belgium</option>
                                                            <option value="BZ">Belize</option>
                                                            <option value="BJ">Benin</option>
                                                            <option value="BM">Bermuda</option>
                                                            <option value="BT">Bhutan</option>
                                                            <option value="BO">Bolivia, Plurinational State of</option>
                                                            <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                            <option value="BA">Bosnia and Herzegovina</option>
                                                            <option value="BW">Botswana</option>
                                                            <option value="BV">Bouvet Island</option>
                                                            <option value="BR">Brazil</option>
                                                            <option value="IO">British Indian Ocean Territory</option>
                                                            <option value="BN">Brunei Darussalam</option>
                                                            <option value="BG">Bulgaria</option>
                                                            <option value="BF">Burkina Faso</option>
                                                            <option value="BI">Burundi</option>
                                                            <option value="KH">Cambodia</option>
                                                            <option value="CM">Cameroon</option>
                                                            <option value="CA">Canada</option>
                                                            <option value="CV">Cape Verde</option>
                                                            <option value="KY">Cayman Islands</option>
                                                            <option value="CF">Central African Republic</option>
                                                            <option value="TD">Chad</option>
                                                            <option value="CL">Chile</option>
                                                            <option value="CN">China</option>
                                                            <option value="CX">Christmas Island</option>
                                                            <option value="CC">Cocos (Keeling) Islands</option>
                                                            <option value="CO">Colombia</option>
                                                            <option value="KM">Comoros</option>
                                                            <option value="CG">Congo</option>
                                                            <option value="CD">Congo, the Democratic Republic of the</option>
                                                            <option value="CK">Cook Islands</option>
                                                            <option value="CR">Costa Rica</option>
                                                            <option value="CI">Côte d'Ivoire</option>
                                                            <option value="HR">Croatia</option>
                                                            <option value="CU">Cuba</option>
                                                            <option value="CW">Curaçao</option>
                                                            <option value="CY">Cyprus</option>
                                                            <option value="CZ">Czech Republic</option>
                                                            <option value="DK">Denmark</option>
                                                            <option value="DJ">Djibouti</option>
                                                            <option value="DM">Dominica</option>
                                                            <option value="DO">Dominican Republic</option>
                                                            <option value="EC">Ecuador</option>
                                                            <option value="EG">Egypt</option>
                                                            <option value="SV">El Salvador</option>
                                                            <option value="GQ">Equatorial Guinea</option>
                                                            <option value="ER">Eritrea</option>
                                                            <option value="EE">Estonia</option>
                                                            <option value="ET">Ethiopia</option>
                                                            <option value="FK">Falkland Islands (Malvinas)</option>
                                                            <option value="FO">Faroe Islands</option>
                                                            <option value="FJ">Fiji</option>
                                                            <option value="FI">Finland</option>
                                                            <option value="FR">France</option>
                                                            <option value="GF">French Guiana</option>
                                                            <option value="PF">French Polynesia</option>
                                                            <option value="TF">French Southern Territories</option>
                                                            <option value="GA">Gabon</option>
                                                            <option value="GM">Gambia</option>
                                                            <option value="GE">Georgia</option>
                                                            <option value="DE">Germany</option>
                                                            <option value="GH">Ghana</option>
                                                            <option value="GI">Gibraltar</option>
                                                            <option value="GR">Greece</option>
                                                            <option value="GL">Greenland</option>
                                                            <option value="GD">Grenada</option>
                                                            <option value="GP">Guadeloupe</option>
                                                            <option value="GU">Guam</option>
                                                            <option value="GT">Guatemala</option>
                                                            <option value="GG">Guernsey</option>
                                                            <option value="GN">Guinea</option>
                                                            <option value="GW">Guinea-Bissau</option>
                                                            <option value="GY">Guyana</option>
                                                            <option value="HT">Haiti</option>
                                                            <option value="HM">Heard Island and McDonald Islands</option>
                                                            <option value="VA">Holy See (Vatican City State)</option>
                                                            <option value="HN">Honduras</option>
                                                            <option value="HK">Hong Kong</option>
                                                            <option value="HU">Hungary</option>
                                                            <option value="IS">Iceland</option>
                                                            <option value="IN">India</option>
                                                            <option value="ID">Indonesia</option>
                                                            <option value="IR">Iran, Islamic Republic of</option>
                                                            <option value="IQ">Iraq</option>
                                                            <option value="IE">Ireland</option>
                                                            <option value="IM">Isle of Man</option>
                                                            <option value="IL">Israel</option>
                                                            <option value="IT">Italy</option>
                                                            <option value="JM">Jamaica</option>
                                                            <option value="JP">Japan</option>
                                                            <option value="JE">Jersey</option>
                                                            <option value="JO">Jordan</option>
                                                            <option value="KZ">Kazakhstan</option>
                                                            <option value="KE">Kenya</option>
                                                            <option value="KI">Kiribati</option>
                                                            <option value="KP">Korea, Democratic People's Republic of</option>
                                                            <option value="KR">Korea, Republic of</option>
                                                            <option value="KW">Kuwait</option>
                                                            <option value="KG">Kyrgyzstan</option>
                                                            <option value="LA">Lao People's Democratic Republic</option>
                                                            <option value="LV">Latvia</option>
                                                            <option value="LB">Lebanon</option>
                                                            <option value="LS">Lesotho</option>
                                                            <option value="LR">Liberia</option>
                                                            <option value="LY">Libya</option>
                                                            <option value="LI">Liechtenstein</option>
                                                            <option value="LT">Lithuania</option>
                                                            <option value="LU">Luxembourg</option>
                                                            <option value="MO">Macao</option>
                                                            <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                            <option value="MG">Madagascar</option>
                                                            <option value="MW">Malawi</option>
                                                            <option value="MY">Malaysia</option>
                                                            <option value="MV">Maldives</option>
                                                            <option value="ML">Mali</option>
                                                            <option value="MT">Malta</option>
                                                            <option value="MH">Marshall Islands</option>
                                                            <option value="MQ">Martinique</option>
                                                            <option value="MR">Mauritania</option>
                                                            <option value="MU">Mauritius</option>
                                                            <option value="YT">Mayotte</option>
                                                            <option value="MX">Mexico</option>
                                                            <option value="FM">Micronesia, Federated States of</option>
                                                            <option value="MD">Moldova, Republic of</option>
                                                            <option value="MC">Monaco</option>
                                                            <option value="MN">Mongolia</option>
                                                            <option value="ME">Montenegro</option>
                                                            <option value="MS">Montserrat</option>
                                                            <option value="MA">Morocco</option>
                                                            <option value="MZ">Mozambique</option>
                                                            <option value="MM">Myanmar</option>
                                                            <option value="NA">Namibia</option>
                                                            <option value="NR">Nauru</option>
                                                            <option value="NP">Nepal</option>
                                                            <option value="NL">Netherlands</option>
                                                            <option value="NC">New Caledonia</option>
                                                            <option value="NZ">New Zealand</option>
                                                            <option value="NI">Nicaragua</option>
                                                            <option value="NE">Niger</option>
                                                            <option value="NG">Nigeria</option>
                                                            <option value="NU">Niue</option>
                                                            <option value="NF">Norfolk Island</option>
                                                            <option value="MP">Northern Mariana Islands</option>
                                                            <option value="NO">Norway</option>
                                                            <option value="OM">Oman</option>
                                                            <option value="PK">Pakistan</option>
                                                            <option value="PW">Palau</option>
                                                            <option value="PS">Palestinian Territory, Occupied</option>
                                                            <option value="PA">Panama</option>
                                                            <option value="PG">Papua New Guinea</option>
                                                            <option value="PY">Paraguay</option>
                                                            <option value="PE">Peru</option>
                                                            <option value="PH">Philippines</option>
                                                            <option value="PN">Pitcairn</option>
                                                            <option value="PL">Poland</option>
                                                            <option value="PT">Portugal</option>
                                                            <option value="PR">Puerto Rico</option>
                                                            <option value="QA">Qatar</option>
                                                            <option value="RE">Réunion</option>
                                                            <option value="RO">Romania</option>
                                                            <option value="RU">Russian Federation</option>
                                                            <option value="RW">Rwanda</option>
                                                            <option value="BL">Saint Barthélemy</option>
                                                            <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                            <option value="KN">Saint Kitts and Nevis</option>
                                                            <option value="LC">Saint Lucia</option>
                                                            <option value="MF">Saint Martin (French part)</option>
                                                            <option value="PM">Saint Pierre and Miquelon</option>
                                                            <option value="VC">Saint Vincent and the Grenadines</option>
                                                            <option value="WS">Samoa</option>
                                                            <option value="SM">San Marino</option>
                                                            <option value="ST">Sao Tome and Principe</option>
                                                            <option value="SA">Saudi Arabia</option>
                                                            <option value="SN">Senegal</option>
                                                            <option value="RS">Serbia</option>
                                                            <option value="SC">Seychelles</option>
                                                            <option value="SL">Sierra Leone</option>
                                                            <option value="SG">Singapore</option>
                                                            <option value="SX">Sint Maarten (Dutch part)</option>
                                                            <option value="SK">Slovakia</option>
                                                            <option value="SI">Slovenia</option>
                                                            <option value="SB">Solomon Islands</option>
                                                            <option value="SO">Somalia</option>
                                                            <option value="ZA">South Africa</option>
                                                            <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                            <option value="SS">South Sudan</option>
                                                            <option value="ES">Spain</option>
                                                            <option value="LK">Sri Lanka</option>
                                                            <option value="SD">Sudan</option>
                                                            <option value="SR">Suriname</option>
                                                            <option value="SJ">Svalbard and Jan Mayen</option>
                                                            <option value="SZ">Swaziland</option>
                                                            <option value="SE">Sweden</option>
                                                            <option value="CH">Switzerland</option>
                                                            <option value="SY">Syrian Arab Republic</option>
                                                            <option value="TW">Taiwan, Province of China</option>
                                                            <option value="TJ">Tajikistan</option>
                                                            <option value="TZ">Tanzania, United Republic of</option>
                                                            <option value="TH">Thailand</option>
                                                            <option value="TL">Timor-Leste</option>
                                                            <option value="TG">Togo</option>
                                                            <option value="TK">Tokelau</option>
                                                            <option value="TO">Tonga</option>
                                                            <option value="TT">Trinidad and Tobago</option>
                                                            <option value="TN">Tunisia</option>
                                                            <option value="TR">Turkey</option>
                                                            <option value="TM">Turkmenistan</option>
                                                            <option value="TC">Turks and Caicos Islands</option>
                                                            <option value="TV">Tuvalu</option>
                                                            <option value="UG">Uganda</option>
                                                            <option value="UA">Ukraine</option>
                                                            <option value="AE">United Arab Emirates</option>
                                                            <option value="GB">United Kingdom</option>
                                                            <option value="US">United States</option>
                                                            <option value="UM">United States Minor Outlying Islands</option>
                                                            <option value="UY">Uruguay</option>
                                                            <option value="UZ">Uzbekistan</option>
                                                            <option value="VU">Vanuatu</option>
                                                            <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                            <option value="VN">Viet Nam</option>
                                                            <option value="VG">Virgin Islands, British</option>
                                                            <option value="VI">Virgin Islands, U.S.</option>
                                                            <option value="WF">Wallis and Futuna</option>
                                                            <option value="EH">Western Sahara</option>
                                                            <option value="YE">Yemen</option>
                                                            <option value="ZM">Zambia</option>
                                                            <option value="ZW">Zimbabwe</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Entity Id</label>
                                                        <input onChange={() => this.removeError("entity_id")} type="text" className="form-control" name="entity_id" id="entity_id" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Entity Type</label>
                                                        <select onChange={() => this.removeError("entity_type")} id="entity_type" className="form-control" name="entity_type">
                                                            <option>None</option>
                                                            <option value="person">Person</option>
                                                            <option valur="organization">Organization</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <div className="form-group">
                                                            <label className="bmd-label-floating"> Names</label>
                                                            <textarea onChange={() => this.removeError("names")} className="form-control" rows="3" name="names" id="names"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Start Date</label>
                                                        <input onChange={() => this.removeError("start_date")} type="date" className="form-control" id="start_date" name="start_date" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">End Date</label>
                                                        <input type="date" className="form-control" id="end_date" name="end_date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn ntn-success" onClick={this.addEntity}>Generate Query</button>
                                            <button type="button" className="btn btn-primary pull-right" onClick={this.postAPIRequest} disabled={loading}>Search</button>
                                            <div className="clearfix"></div>
                                        </form>
                                    </div>
                                    <br />
                                    <div className="card-footer  card-header-primary">
                                        <p>{this.state.JsonFormat}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Modal bsSize="large" show={this.state.setShow} onHide={this.handleClose} animation={false} autoFocus={true}>
                            <Modal.Header>
                                <strong>{this.state.articleTitle}</strong>
                            </Modal.Header>
                            <Modal.Body>

                                <h5>Source : {this.state.ArticleSource}</h5>
                                <p>{this.state.ArticleText}</p>
                                <br />

                                {/* <p>{this.state.ArticleEntities}</p> */}
                                <br />

                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title ">Article List</h4>
                                        <p className="card-category"> Click on the article to view full details</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table id='myTable' className="table" onClick={this.GetArticleURL}>
                                                <thead className="text-primary">
                                                    <tr>{this.renderTableHeader()}</tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderTableData()}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}