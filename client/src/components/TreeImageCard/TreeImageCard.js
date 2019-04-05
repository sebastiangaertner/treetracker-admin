import React, { Component } from 'react'
import PropTypes from 'prop-types'
import compose from 'recompose/compose'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'

import { selectedHighlightColor } from '../../common/variables.js'

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2rem'
  },
  cardImg: {
    width: '100%',
    height: 'auto'
  },
  cardTitle: {
    color: '#f00'
  },
  card: {
    cursor: 'pointer',
    margin: '0.5rem',
    border: `2px #eee solid`
  },
  selected: {
    border: `2px ${selectedHighlightColor} solid`
  },
  cardMedia: {
    height: '12rem'
  },
  cardWrapper: {
    width: '33.33%',
  }
})


class TreeImageCard extends Component {

  constructor(props) {
    super(props)
  }

  onStatusToggle = (e, id, isActive) => {
    const { toggleTreeActive } = this.props;
    e.stopPropagation();
    toggleTreeActive(id, isActive);
  }

  render() {
    const { tree, classes, toggleSelection } = this.props

    return (
      <div
        className={classes.cardWrapper}
        key={tree.id}>
        <Card id={`card_${tree.id}`}
          className={classes.card}
          onClick={
            function(e) {
              e.stopPropagation()
              document.getElementById(`card_${tree.id}`).classList.toggle(classes.selected)
              toggleSelection(tree.id)
            }
          }>
          <CardContent>
            <CardMedia
              className={classes.cardMedia}
              image={tree.imageUrl}
            />
            <Typography
              className={classes.cardTitle}
              color="textSecondary"
              gutterBottom
            >
              Tree# {tree.id}
            </Typography>
          </CardContent>
          <CardActions
            style={{'position': 'fix' }}
            >
            <Button
              size="small"
              onClick={(e) => this.onStatusToggle(e, tree.id, true)}
            >
            Reject
            </Button>
            <Button
              size="small"
              onClick={
                (e)=> this.onStatusToggle(e, tree.id, false)
              }
            >
            Approve
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  toggleTreeActive: (id) => dispatch.imageScrubber.toggleTreeActive(id),
  toggleSelection: (id) => dispatch.imageScrubber.toggleSelection({ id: id })
})

export default compose(
  withStyles(styles, { withTheme: true, name: 'TreeImageCard' }),
  connect(null, mapDispatch)
)(TreeImageCard)
