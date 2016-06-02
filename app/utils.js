Array.prototype.removeItemByID = function(element)
{
    var found;
    for (var i = 0; i < this.length; i++)
    {
        if (this[i].id == element.id)
        {
            found = this[i];
            break;
        }
    }
    if (found)
    {
        var index = this.indexOf(found);
        this.splice(index, 1); // Array
    }
};