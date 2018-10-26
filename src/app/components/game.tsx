import React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {answerCorrect, answerIncorrect, newRound} from "../actions/game";
import {AppAction, AppState, TeamMember} from "../types/redux";
import {Face} from "./face";

import styles from "./game.scss";

const mapStateToProps = (state: AppState) => {
  return {
    teamMembers: state.teamMembers,

    currFaces: state.currFaces,
    currIdx: state.currIdx,
    currReveal: state.currReveal,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<AppAction>) => {
  return {
    answerCorrect_: () => dispatch(answerCorrect()),
    answerIncorrect_: (slug: string) => dispatch(answerIncorrect(slug)),
    newRound_: () => dispatch(newRound()),
  };
};

const Game = ({
  teamMembers,
  currFaces,
  currIdx,
  currReveal,
  answerCorrect_,
  answerIncorrect_,
  newRound_,
}: {
teamMembers: TeamMember[],
currFaces: TeamMember[],
currIdx: number,
currReveal: boolean[],
answerCorrect_: () => AppAction,
answerIncorrect_: (slug: string) => AppAction,
newRound_: () => AppAction,
}) => {
  if (currIdx === null) {
    newRound_();
    return (
      <div>
        <p>Ready</p>
      </div>
    );
  } else {
    const currName = currFaces[currIdx];
    const onClickFace = (teamMember: TeamMember) => {
      if (teamMember.slug === currName.slug) {
        answerCorrect_();
      } else {
        answerIncorrect_(teamMember.slug);
      }
    };
    const faceArray = currFaces.map((teamMember: TeamMember, idx: number) => (
      <Face
        key={idx}
        teamMember={teamMember}
        reveal={currReveal[idx]}
        onClick={onClickFace}
      />
    ));
    return (
      <div>
        <h1>{`Who is ${currName.firstName} ${currName.lastName}?`}</h1>
        <div className={styles.faceContainer}>
          {faceArray}
        </div>
      </div>
    );
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
