import './App.css';
import {Component} from "react";
import About from "./component/About";
import $ from "jquery";
import Header from "./component/Header";
import Projects from "./component/Projects";
import Skills from "./component/Skills";
import * as PropTypes from "prop-types";
import Footer from "./component/Footer";

function Experience(props) {
    return null;
}

Experience.propTypes = {
    resumeExperience: PropTypes.any,
    resumeBasicInfo: PropTypes.any
};

class App extends Component {
    constructor(props) {
        super();
        this.state = {
            foo: "bar",
            resumeData: {},
            sharedData: {},
        };
    }

    applyPickedLanguage(pickedLanguage, oppositeLangIconId) {
        this.swapCurrentlyActiveLanguage(oppositeLangIconId);
        document.documentElement.lang = pickedLanguage;
        var resumePath = document.documentElement.lang === window.$primaryLanguage ? `res_primaryLanguage.json` : `res_secondaryLanguage.json`;
        this.loadResumeFromPath(resumePath);
    }

    swapCurrentlyActiveLanguage(oppositeLangIconId) {
        var pickedLangIconId = oppositeLangIconId === window.$primaryLanguageIconId ? window.$secondaryLanguageIconId : window.$primaryLanguageIconId;
        document.getElementById(oppositeLangIconId).removeAttribute("filter");
        document.getElementById(pickedLangIconId).setAttribute("filter", "brightness(40%)");

    }

    componentDidMount() {
        this.loadSharedDate();
        this.applyPickedLanguage(window.$primaryLanguage, window.$secondaryLanguageIconId);
    }

    loadResumeFromPath(path) {
        $.ajax({
            url: path,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({resumeData: data});
            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);
            },
        });
    }

    loadSharedDate() {
        $.ajax({
            url: `portfolio_shared_data.json`,
            dataType: "json",
            cache: false,
            success: function (data) {
                this.setState({sharedData: data});
                document.title = `${this.state.sharedData.basic_info.name}`;
            }.bind(this),
            error: function (xhr, status, err) {
                alert(err);
            },
        });
    }

    render() {
        return (
            <div>
                <Header sharedData={this.state.sharedData.basic_info}/>
                <div className="col-md-12 mx-auto text-center language">
                    <div
                        onClick={() => this.applyPickedLanguage(window.$primaryLanguage, window.$secondaryLanguageIconId)}
                        style={{display: "inline"}}>
                        <span className="iconify language-icon mr-5" data-icon="twemoji-flag-for-flag-united-kingdom"
                              data-inline="false" id={window.$primaryLanguageIconId}></span>
                    </div>
                    <div
                        onClick={() => this.applyPickedLanguage(window.$secondaryLanguage, window.$primaryLanguageIconId)}
                        style={{display: "inline"}}>
                        <span className="iconify language-icon" data-icon="twemoji-flag-for-flag-poland"
                              data-inline="false" id={window.$secondaryLanguageIconId}></span>
                    </div>
                </div>
                <About resumeBasicInfo={this.state.resumeData.basic_info}
                       sharedBasicInfo={this.state.sharedData.basic_info}/>
                <Projects resumeProjects={this.state.resumeData.projects}
                          resumeBasicInfo={this.state.resumeData.basic_info}/>
                {/*<Skills sharedSkills={this.state.sharedData.skills}*/}
                {/*        resumeBasicInfo={this.state.resumeData.basic_info}/>*/}
                <Experience resumeExperience={this.state.resumeData.experience}
                            resumeBasicInfo={this.state.resumeData.basic_info}/>
                <Footer sharedBasicInfo={this.state.sharedData.basic_info}/>
            </div>
        );
    }
}

export default App;
