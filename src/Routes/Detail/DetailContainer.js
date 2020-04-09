import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";
import Store from "../../Store";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname }
    } = props;
    this.changeValue = (value) =>
      this.setState({
        value
      });
    this.state = {
      result: null,
      error: null,
      Loading: true,
      isMovie: pathname.includes("movie"),
      value: "Companies",
      changeValue: this.changeValue
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id }
      }
    } = this.props;
    const { isMovie } = this.state;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
      const {
        history: { push }
      } = this.props;
      return push("/");
    }
    let result;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId));
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch (error) {
      this.setState({ error: "cant find anything" });
    } finally {
      this.setState({
        Loading: false,
        result
      });
    }
  }

  render() {
    return (
      <Store.Provider value={this.state}>
        <DetailPresenter />
      </Store.Provider>
    );
  }
}
