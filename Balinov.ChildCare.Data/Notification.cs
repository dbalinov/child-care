﻿namespace Balinov.ChildCare.Data
{
    using System;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using Newtonsoft.Json;

    [Table("Notifications")]
    public class Notification : BaseItem
    {
        [Required]
        [MaxLength(150)]
        public string Message { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        public DateTime Date { get; set; }

        [Required]
        [ForeignKey("User")]
        public int UserId { get; set; }

        [JsonIgnore]
        public virtual UserProfile User { get; set; }
    }
}