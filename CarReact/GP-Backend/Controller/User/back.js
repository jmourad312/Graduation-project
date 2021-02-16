
// remove voting on comment
downVoteToComment = async (req, res) => {
  const personDownVote = await Vote.find({
    personDownVoting: { $in: req.user._id },
    comment: req.params.id,
  });
  console.log(personDownVote); 

  if (personDownVote.length > 0) {
    return res.json({
      Data: null,
      Message: "You already vote before",
      Success: false,
    });
  }

  const personVoteUp = await Vote.find({
    personUpVoting: { $in: req.user._id },
    comment: req.params.id,
  });
  console.log(personVoteUp);
  if (personVoteUp.length > 0) {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $pull: { personUpVoting: req.user._id }, $inc: { upVoting: -1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.json({
          Data: data.upVoting - data.downVoting,
          Message: "Done remove voting",
          Success: true,
        });
      }
    );
  } else {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $push: { personDownVoting: req.user._id }, $inc: { downVoting: 1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.status(200).json({
          Data: data.upVoting - data.downVoting,
          Message: "Done add Voting",
          Success: true,
        });
      }
    );
  }
};

upVoteToComment = async (req, res) => {
  const personVoteUp = await Vote.find({
    personUpVoting: { $in: req.user._id },
    comment: req.params.id,
  });
  console.log(personVoteUp);

  if (personVoteUp.length > 0) {
    return res.json({
      Data: null,
      Message: "You already vote before",
      Success: false,
    });
  }

  const personVoteDown = await Vote.find({
    personDownVoting: { $in: req.user._id },
    comment: req.params.id,
  });

  if (personVoteDown.length > 0) {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $pull: { personDownVoting: req.user._id }, $inc: { downVoting: -1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.json({
          Data: data.upVoting - data.downVoting,
          Message: "Done remove voting",
          Success: true,
        });
      }
    );
  } else {
    Vote.findOneAndUpdate(
      { comment: req.params.id },
      { $push: { personUpVoting: req.user._id }, $inc: { upVoting: 1 } },
      (error, data) => {
        if (error || !data) {
          return res.json({
            Data: error,
            Message: "can't vote",
            Success: false,
          });
        }
        return res.status(200).json({
          Data: data.upVoting - data.downVoting,
          Message: "Done add Voting",
          Success: true,
        });
      }
    );
  }
};
