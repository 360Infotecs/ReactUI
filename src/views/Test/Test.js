import React, { Component } from 'react';
//import { useTable } from 'react-table';
import { Modal, Button} from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';



export default class Car extends Component {
    constructor(props) {
        super(props);
        this.state = {
            JsonFormat: "",
            ArticleList: [],
            tableData: [],//[{ "News": "Data unavailable" }]
            ArticleData: "",
            setShow: false,
            show: false,
            ArticleText: "",
            articleTitle: "",
            ArticleSource: "",
            ArticleEntities: [],
            data: {
                columns: [
                  {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Position',
                    field: 'position',
                    sort: 'asc',
                    width: 270
                  },
                  {
                    label: 'Office',
                    field: 'office',
                    sort: 'asc',
                    width: 200
                  },
                  {
                    label: 'Age',
                    field: 'age',
                    sort: 'asc',
                    width: 100
                  },
                  {
                    label: 'Start date',
                    field: 'date',
                    sort: 'asc',
                    width: 150
                  },
                  {
                    label: 'Salary',
                    field: 'salary',
                    sort: 'asc',
                    width: 100
                  }
                ],
                rows: [
                  {
                    name: 'Tiger Nixon',
                    position: 'System Architect',
                    office: 'Edinburgh',
                    age: '61',
                    date: '2011/04/25',
                    salary: '$320'
                  },
                  {
                    name: 'Garrett Winters',
                    position: 'Accountant',
                    office: 'Tokyo',
                    age: '63',
                    date: '2011/07/25',
                    salary: '$170'
                  },
                  {
                    name: 'Ashton Cox',
                    position: 'Junior Technical Author',
                    office: 'San Francisco',
                    age: '66',
                    date: '2009/01/12',
                    salary: '$86'
                  },
                  {
                    name: 'Cedric Kelly',
                    position: 'Senior Javascript Developer',
                    office: 'Edinburgh',
                    age: '22',
                    date: '2012/03/29',
                    salary: '$433'
                  },
                  {
                    name: 'Airi Satou',
                    position: 'Accountant',
                    office: 'Tokyo',
                    age: '33',
                    date: '2008/11/28',
                    salary: '$162'
                  },
                  {
                    name: 'Brielle Williamson',
                    position: 'Integration Specialist',
                    office: 'New York',
                    age: '61',
                    date: '2012/12/02',
                    salary: '$372'
                  },
                  {
                    name: 'Herrod Chandler',
                    position: 'Sales Assistant',
                    office: 'San Francisco',
                    age: '59',
                    date: '2012/08/06',
                    salary: '$137'
                  },
                  {
                    name: 'Rhona Davidson',
                    position: 'Integration Specialist',
                    office: 'Tokyo',
                    age: '55',
                    date: '2010/10/14',
                    salary: '$327'
                  },
                  {
                    name: 'Colleen Hurst',
                    position: 'Javascript Developer',
                    office: 'San Francisco',
                    age: '39',
                    date: '2009/09/15',
                    salary: '$205'
                  },
                  {
                    name: 'Sonya Frost',
                    position: 'Software Engineer',
                    office: 'Edinburgh',
                    age: '23',
                    date: '2008/12/13',
                    salary: '$103'
                  },
                  {
                    name: 'Jena Gaines',
                    position: 'Office Manager',
                    office: 'London',
                    age: '30',
                    date: '2008/12/19',
                    salary: '$90'
                  },
                  {
                    name: 'Quinn Flynn',
                    position: 'Support Lead',
                    office: 'Edinburgh',
                    age: '22',
                    date: '2013/03/03',
                    salary: '$342'
                  },
                  {
                    name: 'Charde Marshall',
                    position: 'Regional Director',
                    office: 'San Francisco',
                    age: '36',
                    date: '2008/10/16',
                    salary: '$470'
                  },
                  {
                    name: 'Haley Kennedy',
                    position: 'Senior Marketing Designer',
                    office: 'London',
                    age: '43',
                    date: '2012/12/18',
                    salary: '$313'
                  },
                  {
                    name: 'Tatyana Fitzpatrick',
                    position: 'Regional Director',
                    office: 'London',
                    age: '19',
                    date: '2010/03/17',
                    salary: '$385'
                  },
                  {
                    name: 'Michael Silva',
                    position: 'Marketing Designer',
                    office: 'London',
                    age: '66',
                    date: '2012/11/27',
                    salary: '$198'
                  },
                  {
                    name: 'Paul Byrd',
                    position: 'Chief Financial Officer (CFO)',
                    office: 'New York',
                    age: '64',
                    date: '2010/06/09',
                    salary: '$725'
                  },
                  {
                    name: 'Gloria Little',
                    position: 'Systems Administrator',
                    office: 'New York',
                    age: '59',
                    date: '2009/04/10',
                    salary: '$237'
                  },
                  {
                    name: 'Bradley Greer',
                    position: 'Software Engineer',
                    office: 'London',
                    age: '41',
                    date: '2012/10/13',
                    salary: '$132'
                  },
                  {
                    name: 'Dai Rios',
                    position: 'Personnel Lead',
                    office: 'Edinburgh',
                    age: '35',
                    date: '2012/09/26',
                    salary: '$217'
                  },
                  {
                    name: 'Jenette Caldwell',
                    position: 'Development Lead',
                    office: 'New York',
                    age: '30',
                    date: '2011/09/03',
                    salary: '$345'
                  },
                  {
                    name: 'Yuri Berry',
                    position: 'Chief Marketing Officer (CMO)',
                    office: 'New York',
                    age: '40',
                    date: '2009/06/25',
                    salary: '$675'
                  },
                  {
                    name: 'Caesar Vance',
                    position: 'Pre-Sales Support',
                    office: 'New York',
                    age: '21',
                    date: '2011/12/12',
                    salary: '$106'
                  },
                  {
                    name: 'Doris Wilder',
                    position: 'Sales Assistant',
                    office: 'Sidney',
                    age: '23',
                    date: '2010/09/20',
                    salary: '$85'
                  },
                  {
                    name: 'Angelica Ramos',
                    position: 'Chief Executive Officer (CEO)',
                    office: 'London',
                    age: '47',
                    date: '2009/10/09',
                    salary: '$1'
                  },
                  {
                    name: 'Gavin Joyce',
                    position: 'Developer',
                    office: 'Edinburgh',
                    age: '42',
                    date: '2010/12/22',
                    salary: '$92'
                  },
                  {
                    name: 'Jennifer Chang',
                    position: 'Regional Director',
                    office: 'Singapore',
                    age: '28',
                    date: '2010/11/14',
                    salary: '$357'
                  },
                  {
                    name: 'Brenden Wagner',
                    position: 'Software Engineer',
                    office: 'San Francisco',
                    age: '28',
                    date: '2011/06/07',
                    salary: '$206'
                  },
                  {
                    name: 'Fiona Green',
                    position: 'Chief Operating Officer (COO)',
                    office: 'San Francisco',
                    age: '48',
                    date: '2010/03/11',
                    salary: '$850'
                  },
                  {
                    name: 'Shou Itou',
                    position: 'Regional Marketing',
                    office: 'Tokyo',
                    age: '20',
                    date: '2011/08/14',
                    salary: '$163'
                  },
                  {
                    name: 'Michelle House',
                    position: 'Integration Specialist',
                    office: 'Sidney',
                    age: '37',
                    date: '2011/06/02',
                    salary: '$95'
                  },
                  {
                    name: 'Suki Burks',
                    position: 'Developer',
                    office: 'London',
                    age: '53',
                    date: '2009/10/22',
                    salary: '$114'
                  },
                  {
                    name: 'Prescott Bartlett',
                    position: 'Technical Author',
                    office: 'London',
                    age: '27',
                    date: '2011/05/07',
                    salary: '$145'
                  },
                  {
                    name: 'Gavin Cortez',
                    position: 'Team Leader',
                    office: 'San Francisco',
                    age: '22',
                    date: '2008/10/26',
                    salary: '$235'
                  },
                  {
                    name: 'Martena Mccray',
                    position: 'Post-Sales support',
                    office: 'Edinburgh',
                    age: '46',
                    date: '2011/03/09',
                    salary: '$324'
                  },
                  {
                    name: 'Unity Butler',
                    position: 'Marketing Designer',
                    office: 'San Francisco',
                    age: '47',
                    date: '2009/12/09',
                    salary: '$85'
                  },
                  {
                    name: 'Howard Hatfield',
                    position: 'Office Manager',
                    office: 'San Francisco',
                    age: '51',
                    date: '2008/12/16',
                    salary: '$164'
                  },
                  {
                    name: 'Hope Fuentes',
                    position: 'Secretary',
                    office: 'San Francisco',
                    age: '41',
                    date: '2010/02/12',
                    salary: '$109'
                  },
                  {
                    name: 'Vivian Harrell',
                    position: 'Financial Controller',
                    office: 'San Francisco',
                    age: '62',
                    date: '2009/02/14',
                    salary: '$452'
                  },
                  {
                    name: 'Timothy Mooney',
                    position: 'Office Manager',
                    office: 'London',
                    age: '37',
                    date: '2008/12/11',
                    salary: '$136'
                  },
                  {
                    name: 'Jackson Bradshaw',
                    position: 'Director',
                    office: 'New York',
                    age: '65',
                    date: '2008/09/26',
                    salary: '$645'
                  },
                  {
                    name: 'Olivia Liang',
                    position: 'Support Engineer',
                    office: 'Singapore',
                    age: '64',
                    date: '2011/02/03',
                    salary: '$234'
                  },
                  {
                    name: 'Bruno Nash',
                    position: 'Software Engineer',
                    office: 'London',
                    age: '38',
                    date: '2011/05/03',
                    salary: '$163'
                  },
                  {
                    name: 'Sakura Yamamoto',
                    position: 'Support Engineer',
                    office: 'Tokyo',
                    age: '37',
                    date: '2009/08/19',
                    salary: '$139'
                  },
                  {
                    name: 'Thor Walton',
                    position: 'Developer',
                    office: 'New York',
                    age: '61',
                    date: '2013/08/11',
                    salary: '$98'
                  },
                  {
                    name: 'Finn Camacho',
                    position: 'Support Engineer',
                    office: 'San Francisco',
                    age: '47',
                    date: '2009/07/07',
                    salary: '$87'
                  },
                  {
                    name: 'Serge Baldwin',
                    position: 'Data Coordinator',
                    office: 'Singapore',
                    age: '64',
                    date: '2012/04/09',
                    salary: '$138'
                  },
                  {
                    name: 'Zenaida Frank',
                    position: 'Software Engineer',
                    office: 'New York',
                    age: '63',
                    date: '2010/01/04',
                    salary: '$125'
                  },
                  {
                    name: 'Zorita Serrano',
                    position: 'Software Engineer',
                    office: 'San Francisco',
                    age: '56',
                    date: '2012/06/01',
                    salary: '$115'
                  },
                  {
                    name: 'Jennifer Acosta',
                    position: 'Junior Javascript Developer',
                    office: 'Edinburgh',
                    age: '43',
                    date: '2013/02/01',
                    salary: '$75'
                  },
                  {
                    name: 'Cara Stevens',
                    position: 'Sales Assistant',
                    office: 'New York',
                    age: '46',
                    date: '2011/12/06',
                    salary: '$145'
                  },
                  {
                    name: 'Hermione Butler',
                    position: 'Regional Director',
                    office: 'London',
                    age: '47',
                    date: '2011/03/21',
                    salary: '$356'
                  },
                  {
                    name: 'Lael Greer',
                    position: 'Systems Administrator',
                    office: 'London',
                    age: '21',
                    date: '2009/02/27',
                    salary: '$103'
                  },
                  {
                    name: 'Jonas Alexander',
                    position: 'Developer',
                    office: 'San Francisco',
                    age: '30',
                    date: '2010/07/14',
                    salary: '$86'
                  },
                  {
                    name: 'Shad Decker',
                    position: 'Regional Director',
                    office: 'Edinburgh',
                    age: '51',
                    date: '2008/11/13',
                    salary: '$183'
                  },
                  {
                    name: 'Michael Bruce',
                    position: 'Javascript Developer',
                    office: 'Singapore',
                    age: '29',
                    date: '2011/06/27',
                    salary: '$183'
                  },
                  {
                    name: 'Donna Snider',
                    position: 'Customer Support',
                    office: 'New York',
                    age: '27',
                    date: '2011/01/25',
                    salary: '$112'
                  }
                ]
              }
        };
        this.jsons = "";
    }

    renderTableHeader() {
        if (this.state.ArticleList.length !== 0) {
            let header = Object.keys(this.state.ArticleList[0]);
            return header.map((key, index) => {
                return <th key={index}>{key.toUpperCase()}</th>
            })
        }
    }
  
    renderTableData() {
        if (this.state.ArticleList.length !== 0) {
            return this.state.ArticleList.map((Article, index) => {
                const { no, source, classes, view_article_path } = Article //destructuring
                return (
                    <tr key={no}>
                        <td>{no}</td>
                        <td>{source}</td>
                        <td>{classes}</td>
                        <td>{view_article_path}</td>
                    </tr>
                )
            })
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
                    var arr = json.results, i, j = "", x = "", no = 1;

                    if (arr.length !== 0) {
                        for (i in arr) {
                            for (x in arr[i].classification_1.classes) {
                                j += '{"no":' + no + ',"source":"' + arr[i].source + '",';
                                j += '"classes":"' + arr[i].classification_1.classes[x] + '",';
                                j += '"view_article_path":"' + arr[i].view_article_path + '"},';
                                no = no + 1;
                            }
                        }
                    }
                    j = j.slice(0, -1);
                    j = '[' + j + ']';
                    var myJSON = JSON.stringify(j);
                    var xx = JSON.parse(myJSON);
                    xx = JSON.parse(xx);

                    this.setState({
                        ArticleList: xx
                    });
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

        if (jurisdiction && entityType !== "None") {
            if (this.jsons === "") {
                this.jsons = '[{"entity_id":"' + entityId + '","names":' + nameJaon + ',"jurisdiction":"' + jurisdiction + '","entity_type":"' + entityType;
                if (!startDate === "" || !startDate === null) {
                    this.jsons = this.jsons + '","start_date": "' + startDate;
                }

                if (!endDate === "" || endDate === null) {
                    this.jsons = this.jsons + '","end_date": "' + endDate;
                }
                this.jsons = this.jsons + '"}]'
            }
            else {
                var fiestEntity = this.jsons.slice(0, -1);
                this.jsons = fiestEntity + ',{"entity_id":"' + entityId + '","names":' + nameJaon + ',"jurisdiction":"' + jurisdiction + '","entity_type":"' + entityType;
                if (!startDate === "" || !startDate === null) {
                    this.jsons = this.jsons + '","start_date": "' + startDate;
                }

                if (!endDate === "" || endDate === null) {
                    this.jsons = this.jsons + '","end_date": "' + endDate;
                }

                this.jsons = this.jsons + '"}]'
            }
            this.setState({ JsonFormat: this.jsons });
            document.getElementById("payloadForm").reset();
        }
        else {
            alert("Fields can't be emply");
        }
    }

    postAPIRequest = () => {
        var url = "https://ypgfg7d5t6.execute-api.eu-west-1.amazonaws.com/Prod/v1/entity-news";
        var method = 'POST';
        //var body = '[{"entity_id":"B-100000-1","names":["Oracle"],"jurisdiction":"DE","entity_type":"Organization"}]';
        if (this.state.JsonFormat !== "") {
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
                    var key, arr, i, j;

                    key = Object.keys(jsObj.News);
                    for (j in key) {
                        for (i in jsObj.News[key[j]].classifications) {
                            if (jsObj.News[key[j]].status === "done") {
                                arr = this.state.tableData;
                                arr.push(jsObj.News[key[j]].classifications[i]._links.articles);
                            }
                        }
                    }
                    this.ListArticle(arr);
                    this.setState({JsonFormat:""})
                })
                .catch(error => console.log('error', error));
        }
        else{
            alert("No Arguments");
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
            console.log(celVal);
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



    render() {
        return (
            <div>
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
                                                        <input type="text" className="form-control" name="jurisdiction" id="jurisdiction" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Entity Id</label>
                                                        <input type="text" className="form-control" name="entity_id" id="entity_id" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Entity Type</label>
                                                        <select id="entity_type" className="form-control" name="entity_type">
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
                                                            <textarea className="form-control" rows="3" name="names" id="names"></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">Start Date</label>
                                                        <input type="date" className="form-control" id="start_date" name="start_date" />
                                                    </div>
                                                </div>
                                                <div className="col-md-4">
                                                    <div className="form-group">
                                                        <label className="bmd-label-floating">End Date</label>
                                                        <input type="date" className="form-control" id="end_date" name="end_date" />
                                                    </div>
                                                </div>
                                            </div>
                                            <button type="button" className="btn ntn-success" onClick={this.addEntity}>Add</button>
                                            <button type="button" className="btn btn-primary pull-right" onClick={this.postAPIRequest}>Search</button>
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
                        {/* <div className="row">
                            <Button variant="primary" onClick={this.handleShow}>
                                Launch demo modal
                            </Button> */}

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
                        {/* </div> */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card">
                                    <div className="card-header card-header-primary">
                                        <h4 className="card-title ">Article List</h4>
                                        <p className="card-category"> Click on the article to view full details</p>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                        <MDBDataTable
      striped
      bordered
      hover
      data={this.state.data}
    />
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