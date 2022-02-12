# Date Formater

```php
<?php
// for some reason the $_POST super-global is empty...
// this is a work-around
$request_body = file_get_contents('php://input');
$__POST = json_decode($request_body, true);

class Timing
{
    private $rawDate;
    /**
     * Just figured that this timezone setting is still
     * important
     */
    public function __construct()
    {
        date_default_timezone_set("Africa/Lagos");
        $request_body = file_get_contents('php://input');
        $__POST = json_decode($request_body, true);
        $this->rawDate = isset($__POST['raw_date']) ? $__POST['raw_date'] : null;
    }

    public function themeTiming()
    {
        // return 'night';
        $time = date('G');
        // day time
        if ($time >= 7 && $time <= 18) {
            return 'day';
        }
        // night time
        else {
            return 'night';
        }
    }

    /**
     * Determine time of day
     * [ format: morning (early), afternoon, night (late) ]
     *
     * @return string time of day
     */
    public function getTimeOfDay()
    {
        $time = date('G');
        if ($time <= 11) {
            // morning
            $current = 'morning';
            // check if its early morning
            if ($time <= 5) {
                $current = 'early morning';
            }
        } elseif ($time <= 15) {
            // afternoon
            $current = 'afternoon';
        } elseif ($time <= 19) {
            // evening
            $current = 'evening';
        } else {
            // night
            $current = 'night';
            if ($time > 21) {
                $current = 'late night';
            }
        }
        return $current;
    }

    // parse a raw date to display a more user friendly, readable output
    public function dateParser()
    {
        $converted   = strtotime($this->rawDate);
        $currentTime = time();
        $timeDiff    = $currentTime - $converted;
        $seconds     = $timeDiff;

        $month = date('M', $converted);
        $day   = date('d', $converted);
        $year  = date('Y', $converted);
        $time  = date('h:ia', $converted);

        $minutes = round($seconds / 60); // value 60 is seconds
        $hours   = round($seconds / 3600); //value 3600 is 60 minutes * 60 sec
        $days    = round($seconds / 86400); //86400 = 24 * 60 * 60;
        $weeks   = round($seconds / 604800); // 7*24*60*60;
        $months  = round($seconds / 2629440); //((365+365+365+365+366)/5/12)*24*60*60
        $years   = round($seconds / 31553280); //(365+365+365+365+366)/5 * 24 * 60 * 60
        if ($seconds <= 60) {
            $display = "Just Now";
        } elseif ($minutes <= 60) {
            if ($minutes == 1) {
                $display = "one minute ago";
            } else {
                $display = "$minutes minutes ago";
            }
        } elseif ($hours <= 24) {
            if ($hours == 1) {
                $display = "an hour ago";
            } else {
                $display = "$hours hrs ago";
            }
        } elseif ($days <= 4) {
            if ($days == 1) {
                $display = "yesterday";
            } else {
                $display = "$days days ago";
            }
        } else {
            $display = "$month $day, $year at $time";
        }

        // return an output
        return $display;
    }

    /**
     * Called elaborate because its more detailed than the previous
     *
     * @return string human readable date
     */
    public function elaborateDateParser()
    {
        $converted   = strtotime($this->rawDate);
        $currentTime = time();
        $timeDiff    = $currentTime - $converted;
        $seconds     = $timeDiff;

        $month = date('M', $converted);
        $day   = date('D', $converted);
        $year  = date('Y', $converted);
        $time  = date('h:ia', $converted);

        $minutes = round($seconds / 60); // value 60 is seconds
        $hours   = round($seconds / 3600); //value 3600 is 60 minutes * 60 sec
        $days    = round($seconds / 86400); //86400 = 24 * 60 * 60;
        $weeks   = round($seconds / 604800); // 7*24*60*60;
        $months  = round($seconds / 2629440); //((365+365+365+365+366)/5/12)*24*60*60
        $years   = round($seconds / 31553280); //(365+365+365+365+366)/5 * 24 * 60 * 60
        if ($seconds <= 60) {
            $display = "Just Now";
        } elseif ($minutes <= 60) {
            if ($minutes == 1) {
                $display = "one minute ago";
            } else {
                $display = "$minutes minutes ago";
            }
        } elseif ($hours <= 24) {
            if ($hours == 1) {
                $display = "an hour ago";
            } else {
                $display = "$hours hrs ago";
            }
        } elseif ($days <= 7) {
            if ($days == 1) {
                $display = "yesterday";
            } else {
                $display = "$days days ago";
            }
        } elseif ($weeks <= 4.3) {
            if ($weeks == 1) {
                $display = "a week ago";
            } else {
                $display = "$weeks weeks ago";
            }
        } elseif ($months <= 12) {
            if ($months == 1) {
                $display = "$day, a month ago at $time";
            } else {
                $display = "$day, $months months ago at $time";
            }
        } else {
            if ($years == 1) {
                $display = "a year ago on $month at $time";
            } else {
                $display = "$years years ago on $month at $time";
            }
        }

        // return an output
        return $display;
    }

    /**
     * Gets number of days from a past date
     *
     * @return int $days
     */
    public function getDateDays()
    {
        # function to return the number of days ofset from current day
        $converted   = strtotime($this->rawDate);
        $currentTime = time();
        $timeDiff    = $currentTime - $converted;
        $seconds     = $timeDiff;

        $day = date('D', $converted);

        $days = round($seconds / 86400); //86400 = 24 * 60 * 60;

        // return the number of days
        return $days;
    }
}
// run em
$result = new Timing();
if(isset($__POST)){
    echo $__POST['parse_type']=='time-ago' ? $result->elaborateDateParser() : $result->dateParser();
}
```

Demo [here](https://date-parsing-script.herokuapp.com/)