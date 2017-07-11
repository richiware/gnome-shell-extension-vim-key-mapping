const Lang = imports.lang;
const Clutter = imports.gi.Clutter;
const Main = imports.ui.main;

let connection_id;

function init()
{
    /* do nothing */
}

function enable()
{
    //connection_id = Main.overview._overview.connect('key-press-event', Lang.bind(this, this.event_handler));
    connection_id = global.stage.connect('key-press-event', Lang.bind(this, function(actor, event) {
        state = event.get_state();
        if((state & Clutter.ModifierType.CONTROL_MASK) == 0)
            return Clutter.EVENT_PROPAGATE;

        switch (event.get_key_symbol()) {
            case Clutter.j:
                event.set_key_symbol(Clutter.Down);
                event.set_state(0);
                break;
            case Clutter.l:
                event.set_key_symbol(Clutter.Right);
                event.set_state(0);
                break;
            case Clutter.k:
                event.set_key_symbol(Clutter.Up);
                event.set_state(0);
                break;
            case Clutter.h:
                event.set_key_symbol(Clutter.Left);
                event.set_state(0);
                break;
            default:
                return Clutter.EVENT_PROPAGATE;
        }

        event.put();

        return Clutter.EVENT_STOP;
    }));
}

function disable()
{
    //Main.overview._overview.disconnect(connection_id);
    global.stage.disconnect(connection_id);
}
