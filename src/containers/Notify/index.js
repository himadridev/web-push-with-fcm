import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import Card, { CardActions, CardContent } from "material-ui/Card";
import { FormControlLabel, FormGroup } from "material-ui/Form";
import Typography from "material-ui/Typography";
import Switch from "material-ui/Switch";
import Button from "material-ui/Button";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from "material-ui/Dialog";
import Banner from "../../components/Banner";
import CONFIG from "../../../config/firebase.config";

const styles = theme => ({
  card: {
    "margin": "10px",
  },
  title: {
    "text-transform": "uppercase",
    "margin-bottom": 12,
    "color": theme.palette.text.secondary,
  },
  subTitle: {
    "margin-bottom": 5,
    "color": theme.palette.text.secondary,
  },
  token: {
    "padding": "16px",
    "border-radius": "5px",
    "background-color": "#e4e4e4",
    "word-wrap": "break-word"
  }
});

class Notify extends Component {
  state = {
    open: false,
    token: null,
    // permission: Notification.permission
    message: null
  };
  
  componentDidMount() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(CONFIG);
    }

    this.messaging = firebase.messaging();

    navigator.serviceWorker.ready.then((swReg) => {
      console.log("Service Worker is ready.")
      this.messaging.useServiceWorker(swReg);

      this.messaging.onMessage((payload) => {
        console.log("Message foreground received. ", payload);
        if (payload && payload.data && payload.data.message) {
          const message = JSON.parse(payload.data.message);
          this.setState({ open: true, message });
        }
      });

      this._initState();
    })
  }

  _initState = () => {
    this.messaging.getToken()
      .then((token) => {
        this.setState({ token });
      })
      .catch((err) => {
        console.log("Error getting token - ", err);
      });
  }

  _handleDeleteToken = () => {
    this.messaging.getToken()
      .then((token) => this.messaging.deleteToken(token))
      .then(() => {
        console.log("Token Deleted Successfully.");
        // TODO: update app server;
        this.setState({ token: null });
      })
      .catch((err) => {
        console.log("Error While Deleting Token - ", err);
      });
  };

  _handleNotificationPermission = (event, checked) => {
    console.log("Current Switch --- ", checked);
    if(checked) {
      this.messaging.requestPermission()
        .then(() => {
          console.log("Notification permission granted.");
          return this.messaging.getToken()
        })
        .then((token) => {
          this.setState({ token });
        })
        .catch((error) => {
          console.log("Unable to get permission to notify.", error);
        });
    } else {
      this._handleDeleteToken()
    }
  };

  _handleRequestClose = () => {
    this.setState({ open: false });
  };

  messaging = null;

  render() {
    const { classes } = this.props;
    const { open, message } = this.state;
    return (
      <div>
        <Banner />
        <Card className={ classes.card }>
          <CardContent>
            <Typography className={ classes.title }>
              Notification Settings
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={ !!this.state.token }
                    onChange={(event, checked) =>
                      this._handleNotificationPermission(event, checked) }
                  />
                }
                label="Enable Notification"
              />
            </FormGroup>
            { this.state.token && (
                <div>
                  <Typography className={ classes.subTitle }>
                    Token
                  </Typography>
                  <div className={ classes.token }>
                      { this.state.token }
                  </div>
                </div>
            ) }
          </CardContent>
        </Card>
        { message && (
            <Dialog
            fullScreen={ false }
            open={ open }
            onRequestClose={this._handleRequestClose}
            >
            <DialogTitle> { message.title } </DialogTitle>
            <DialogContent>
              <DialogContentText>
                { message.body }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this._handleRequestClose} color="primary" autoFocus>
                Okey, Got it
              </Button>
            </DialogActions>
          </Dialog>
        ) }
      </div>
    );
    // return this.props.children;
  }
}

export default withStyles(styles)(Notify);
