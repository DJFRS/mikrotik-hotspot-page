(function($) {
    $(document).ready(function() {
        $('input[name=rss]').each(function() {
            var url = 'appscms/rss/rssajaxservice.php';
            var rss = $(this).val();
            var parent = $(this).closest('div');
            var pageElement = $(parent).attr('id');
            var description = $(parent).find('input[name=description]').val();
            var size = $(parent).find('input[name=size]').val();
            var query = 'rss=' + rss + '&description=' + description + '&size=' + size;
            doajaxjquery(url, query, 'jcbacknoloading', 'post', 'html', pageElement, '', '');
        });
        $('span.dateinputs [name$="[d]"],span.dateinputs [name$="[m]"],span.dateinputs [name$="[y]"]').live('keyup', function() {
            var value = $(this).val().replace(/[^0-9]/g, '');
            var type = $(this).attr('name').substr($(this).attr('name').length - 3, 3);
            switch (type) {
                case '[d]':
                    if (value.length > 1) {
                        if (value > 31) {
                            showTooltip($(this), 'روز باید عددی بین 1 تا 31 باشد', 2000);
                            value = value.substr(0, 1);
                        } else {
                            if (value < 1) {
                                value = '01';
                            }
                            $(this).next('input:text').focus();
                        }
                    }
                    value = value.substr(0, 2);
                    break;
                case '[m]':
                    if (value.length > 1) {
                        if (value > 12) {
                            showTooltip($(this), 'ماه باید عددی بین 1 تا 12 باشد', 2000);
                            value = value.substr(0, 1);
                        } else {
                            if (value < 1) {
                                value = '01';
                            }
                            $(this).next('input:text').focus();
                        }
                    }
                    value = value.substr(0, 2);
                    break;
                case '[y]':
                    value = value.substr(0, 4);
                    break;
            }
            $(this).val(value);
        });
        $('span.dateinputs [name$="[d]"],span.dateinputs [name$="[m]"],span.dateinputs [name$="[y]"]').live('blur', function() {
            var value = $(this).val().replace(/[^0-9]/g, '');
            var type = $(this).attr('name').substr($(this).attr('name').length - 3, 3);
            switch (type) {
                case '[d]':
                    if (value < 10 && value > 0 && value.length == 1) {
                        value = '0' + value;
                    }
                    break;
                case '[m]':
                    if (value < 10 && value > 0 && value.length == 1) {
                        value = '0' + value;
                    }
                    break;
                case '[y]':
                    var lngth = value.length;
                    switch (lngth) {
                        case 1:
                            value = '139' + value;
                            break;
                        case 2:
                            value = '13' + value;
                            break;
                        case 3:
                            value = '1' + value;
                            break;
                    }
                    break;
            }
            $(this).val(value);
        });
    });
})(jQuery);

function trim(str) {
    return str.replace(/^\s+|\s+$/g, "");
}

function eteraz(stdid, classid, divid)
{
    var comment = jQuery('#comment').val();
    var lessen = jQuery('#stdlessen').val();
    var url = "";
    var query = "stdid=" + stdid + "&classid=" + classid + "&lessen=" + lessen + "&comment=" + comment;
    url = "appssch/workbook/eteraz.php";
    send(divid, url, query)
}

function numberCheck(e) {
    return !(e.which != 8 && e.which != 0 && e.which != 46 && e.which != 45 && (e.which < 48 || e.which > 57) && (e.keyCode != 65 && e.ctrlKey !== true));
}

function correct_number_format(n, decPlaces, thouSeparator, decSeparator) {
    if (n == '-') {
        return n;
    } else {
        var decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 0 : decPlaces,
                decSeparator = decSeparator == undefined ? "." : decSeparator,
                thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
                sign = n < 0 ? "-" : "",
                i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
                j = (j = i.length) > 3 ? j % 3 : 0;
        return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
    }
}

function number_format(elem) {
    var number = jQuery(elem).val(), minus = '', afterPoint = '';
    if (number.indexOf('-') !== -1) {
        minus = '-';
        number = number.replace(/\-/g, '');
    }
    var dotPos = number.indexOf('.');
    if (dotPos > 0) {
        afterPoint = '.' + number.substring(dotPos).replace(/[^0-9]/g, '');
        number = number.substring(0, dotPos);
    }
    jQuery(elem).css('direction', 'ltr').val(minus + number.replace(/[^0-9]/g, '').replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") + afterPoint);
}

function isemail(emailAddress) {
    var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
    return pattern.test(emailAddress);
}

function isurl(textval) {
    var urlregex = new RegExp("^(http:\/\/www.|https:\/\/www.|ftp:\/\/www.|www.){1}([0-9A-Za-z]+\.)");
    return urlregex.test(textval);
}

function isnumeric(str) {
    var RE = /^-{0,1}\d*\.{0,1}\d+$/;
    return (RE.test(str));
}

function changestate(state) {
    var url = "appscms/forms/selectcity.php";
    var options = '<option value="0">در حال بارگذاری...</option>';
    jQuery("#city" + jQuery(state).attr('id')).html(options);
    options = '';
    jQuery.get(url, {
        state: jQuery(state).val(),
        ajax: 'true'
    }, function(data) {
        var j = data.split("\n");
        for (var i = 0; i < (j.length - 1); i++) {
            options += '<option value="' + j[i] + '">' + j[i] + '</option>';
        }
        jQuery("#city" + jQuery(state).attr('id')).html(options);
    });
}

jQuery.fn.print = function() {
    // NOTE: We are trimming the jQuery collection down to the
    // first element in the collection.
    if (this.size() > 1) {
        this.eq(0).print();
        return;
    } else if (!this.size()) {
        return;
    }

    // ASSERT: At this point, we know that the current jQuery
    // collection (as defined by THIS), contains only one
    // printable element.

    // Create a random name for the print frame.
    var strFrameName = ("printer-" + (new Date()).getTime());

    // Create an iFrame with the new name.
    var jFrame = jQuery("<iframe name='" + strFrameName + "'>");

    // Hide the frame (sort of) and attach to the body.
    jFrame
            .css("width", "1px")
            .css("height", "1px")
            .css("position", "absolute")
            .css("left", "-9999px")
            .appendTo(jQuery("body:first"))
            ;

    // Get a FRAMES reference to the new frame.
    var objFrame = window.frames[ strFrameName ];

    // Get a reference to the DOM in the new frame.
    var objDoc = objFrame.document;

    // Grab all the style tags and copy to the new
    // document so that we capture look and feel of
    // the current document.

    // Create a temp document DIV to hold the style tags.
    // This is the only way I could find to get the style
    // tags into IE.
    var jStyleDiv = jQuery("<div>").append(
            jQuery("style").clone()
            );
    // Write the HTML for the document. In this, we will
    // write out the HTML of the current element.
    objDoc.open();
    objDoc.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">");
    objDoc.write("<html>");
    objDoc.write("<body>");
    objDoc.write("<head>");
    objDoc.write("<title>");
    objDoc.write(document.title);
    objDoc.write("</title>");
    objDoc.write(jStyleDiv.html());
    objDoc.write("</head>");
    objDoc.write(this.html());
    objDoc.write("</body>");
    objDoc.write("</html>");
    objDoc.close();

    // Print the document.
    objFrame.focus();
    objFrame.print();

    // Have the frame remove itself in about a minute so that
    // we don't build up too many of these frames.
    setTimeout(
            function() {
                jFrame.remove();
            },
            (60 * 1000)
            );
};